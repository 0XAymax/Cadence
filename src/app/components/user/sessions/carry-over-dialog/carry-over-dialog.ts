import { Component, effect, input, output, signal , ChangeDetectionStrategy } from '@angular/core';
import { TitleCasePipe } from '@angular/common';
import { HlmDialogImports } from '@spartan-ng/helm/dialog';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { CarryOverItem, carryOverItemsToSubSessionRequests } from './carry-over.utils';
import { CreateSubSessionRequest } from '@app/core/models/session.model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-carry-over-dialog',
  templateUrl: './carry-over-dialog.html',
  imports: [HlmDialogImports, HlmButtonImports, HlmCheckboxImports, TitleCasePipe],
})
export class CarryOverDialogComponent {
  state = input.required<'closed' | 'open'>();
  missedItems = input.required<CarryOverItem[]>();

  dialogStateChange = output<'closed' | 'open'>();
  carryOverSelected = output<CreateSubSessionRequest[]>();
  skip = output<void>();

  items = signal<CarryOverItem[]>([]);

  constructor() {
    effect(() => {
      const raw = this.missedItems();
      this.items.set(raw);
    });
  }

  toggleItem(index: number) {
    this.items.update((current) =>
      current.map((item, i) => (i === index ? { ...item, selected: !item.selected } : item)),
    );
  }

  handleAddToWeek(ctx: { close: () => void }) {
    const requests: CreateSubSessionRequest[] = carryOverItemsToSubSessionRequests(
      this.items(),
    ).map((r) => ({
      ...r,
      startTime: r.startTime ? String(r.startTime).slice(0, 5) : r.startTime,
      endTime: r.endTime ? String(r.endTime).slice(0, 5) : r.endTime,
    }));
    this.carryOverSelected.emit(requests);
    this.dialogStateChange.emit('closed');
    ctx.close();
  }

  handleSkip(ctx: { close: () => void }) {
    this.skip.emit();
    this.dialogStateChange.emit('closed');
    ctx.close();
  }

  onStateChange(event: 'closed' | 'open') {
    this.dialogStateChange.emit(event);
  }
}
