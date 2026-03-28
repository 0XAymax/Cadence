import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Group, MemberItem } from '../../../../core/models/group.model';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { BrnDialogImports } from '@spartan-ng/brain/dialog';

@Component({
  selector: 'app-group-settings-tab',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HlmCardImports,
    HlmInputImports,
    HlmLabelImports,
    HlmButtonImports,
    HlmDialogImports,
    BrnDialogImports,
  ],
  templateUrl: './group-settings-tab.html',
})
export class GroupSettingsTabComponent {
  group = input.required<Group>();
  members = input.required<MemberItem[]>();
  currentUserId = input.required<string>();

  updateGroup = output<{ name: string; description: string; type: 'OPEN' | 'LOCKED' }>();
  transferAdmin = output<string>(); // emits membershipId
  deleteGroup = output<void>();

  name = signal('');
  description = signal('');
  type = signal<'OPEN' | 'LOCKED'>('OPEN');

  selectedMemberId = signal<string>('');

  transferState = signal<'closed' | 'open'>('closed');
  deleteState = signal<'closed' | 'open'>('closed');

  constructor() {
    effect(
      () => {
        const g = this.group();
        if (g) {
          this.name.set(g.name);
          this.description.set(g.description);
          this.type.set(g.type);
        }
      },
      { allowSignalWrites: true },
    );
  }

  isChanged(): boolean {
    const g = this.group();
    if (!g) return false;
    return this.name() !== g.name || this.description() !== g.description || this.type() !== g.type;
  }

  saveSettings() {
    if (!this.isChanged()) return;
    this.updateGroup.emit({
      name: this.name(),
      description: this.description(),
      type: this.type(),
    });
  }

  get otherMembers() {
    return signal(this.members().filter((m) => m.userId !== this.currentUserId()));
  }

  confirmTransfer() {
    if (this.selectedMemberId()) {
      this.transferAdmin.emit(this.selectedMemberId());
    }
    this.transferState.set('closed');
    this.selectedMemberId.set('');
  }

  confirmDelete() {
    this.deleteGroup.emit();
    this.deleteState.set('closed');
  }
}
