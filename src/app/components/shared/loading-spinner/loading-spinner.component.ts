import { Component, input } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template: `
    @if (isLoading()) {
      <div class="flex justify-center items-center p-4">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    }
  `,
})
export class LoadingSpinnerComponent {
  isLoading = input<boolean>(false);
}
