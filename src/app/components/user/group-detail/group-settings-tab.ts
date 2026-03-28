import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Group, MemberItem } from '../../../core/models/group.model';
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
  template: `
    <div class="space-y-6 mt-6">
      <!-- Group Info Form -->
      <div hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Group Settings</h3>
          <p hlmCardDescription>Update your group's details and preferences.</p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <label hlmLabel>Group Name</label>
            <input hlmInput [(ngModel)]="name" class="w-full" />
          </div>

          <div class="space-y-2">
            <label hlmLabel>Description</label>
            <textarea hlmInput [(ngModel)]="description" class="min-h-24 w-full"></textarea>
          </div>

          <div class="space-y-2">
            <label hlmLabel>Type</label>
            <select hlmInput [(ngModel)]="type" class="w-full h-10 px-3 cursor-pointer">
              <option value="OPEN">Open (Anyone can join)</option>
              <option value="LOCKED">Locked (Requires approval)</option>
            </select>
          </div>
        </div>
        <div hlmCardFooter class="justify-end">
          <button hlmBtn [disabled]="!isChanged()" (click)="saveSettings()">Save Changes</button>
        </div>
      </div>

      <!-- Transfer Admin -->
      <div hlmCard>
        <div hlmCardHeader>
          <h3 hlmCardTitle>Transfer Admin</h3>
          <p hlmCardDescription>
            Transfer your admin rights to another member. You will become a regular member.
          </p>
        </div>
        <div hlmCardContent class="space-y-4">
          <div class="space-y-2">
            <label hlmLabel>Select Member</label>
            <select hlmInput [(ngModel)]="selectedMemberId" class="w-full h-10 px-3 cursor-pointer">
              <option value="">-- Choose a member --</option>
              @for (m of otherMembers(); track m.membershipId) {
                <option [value]="m.membershipId">{{ m.fullName }} ({{ m.role }})</option>
              }
            </select>
          </div>
        </div>
        <div hlmCardFooter class="justify-start">
          <button
            hlmBtn
            variant="outline"
            [disabled]="!selectedMemberId()"
            (click)="transferState.set('open')"
          >
            Transfer Admin Rights
          </button>
        </div>
      </div>

      <!-- Danger Zone -->
      <div hlmCard class="border-destructive/50">
        <div hlmCardHeader>
          <h3 hlmCardTitle class="text-destructive">Danger Zone</h3>
          <p hlmCardDescription>Permanently delete this group and all its data.</p>
        </div>
        <div hlmCardFooter class="justify-start">
          <button hlmBtn variant="destructive" (click)="deleteState.set('open')">
            Delete Group
          </button>
        </div>
      </div>

      <!-- Transfer Admin Dialog -->
      <hlm-dialog [state]="transferState()" (stateChanged)="transferState.set($event)">
        <hlm-dialog-content *hlmDialogPortal="let ctx" class="sm:max-w-md">
          <hlm-dialog-header>
            <h3 hlmDialogTitle>Transfer Admin Rights</h3>
            <p hlmDialogDescription>
              Are you sure you want to transfer your admin rights? You will no longer be an admin of
              this group.
            </p>
          </hlm-dialog-header>
          <hlm-dialog-footer>
            <button hlmBtn variant="outline" (click)="transferState.set('closed')">Cancel</button>
            <button hlmBtn (click)="confirmTransfer()">Confirm Transfer</button>
          </hlm-dialog-footer>
        </hlm-dialog-content>
      </hlm-dialog>

      <!-- Delete Group Dialog -->
      <hlm-dialog [state]="deleteState()" (stateChanged)="deleteState.set($event)">
        <hlm-dialog-content *hlmDialogPortal="let ctx" class="sm:max-w-md">
          <hlm-dialog-header>
            <h3 hlmDialogTitle>Delete Group</h3>
            <p hlmDialogDescription>
              This action cannot be undone. This will permanently delete the group, its feed, and
              remove all members.
            </p>
          </hlm-dialog-header>
          <hlm-dialog-footer>
            <button hlmBtn variant="outline" (click)="deleteState.set('closed')">Cancel</button>
            <button hlmBtn variant="destructive" (click)="confirmDelete()">Delete Group</button>
          </hlm-dialog-footer>
        </hlm-dialog-content>
      </hlm-dialog>
    </div>
  `,
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
