import { Component, output } from '@angular/core';

@Component({
  selector: 'app-page-actions-bar',
  standalone: true,
  templateUrl: './page-actions-bar.html',
})
export class PageActionsBarComponent {
  onReset = output<void>();
  onSave = output<void>();
}
