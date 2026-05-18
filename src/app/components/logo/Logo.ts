import { Component, Input, ChangeDetectionStrategy, inject } from '@angular/core';
import { NgOptimizedImage } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-logo',
  imports: [NgOptimizedImage],
  template: `
    <img
      [ngSrc]="themeService.theme() === 'dark' ? 'LogoDark.webp' : 'WhiteMode.webp'"
      alt="Cadence"
      [class]="'w-auto ' + sizeClass"
      [width]="width"
      [height]="height"
      priority
    />
  `,
})
export class LogoComponent {
  public themeService = inject(ThemeService);
  @Input() size: 'sm' | 'md' | 'lg' = 'md';

  get sizeClass() {
    return { sm: 'h-6', md: 'h-7', lg: 'h-10' }[this.size];
  }

  get width() {
    return { sm: 85, md: 113, lg: 141 }[this.size];
  }

  get height() {
    return { sm: 24, md: 32, lg: 40 }[this.size];
  }
}
