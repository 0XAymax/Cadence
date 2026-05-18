import { Component, signal , ChangeDetectionStrategy, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HlmToasterImports } from '@spartan-ng/helm/sonner';
import { GlobalAlertComponent } from './components/shared/alert/alert';
import { NgIconsModule } from '@ng-icons/core';
import { ThemeService } from './core/services/theme.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  imports: [RouterOutlet, HlmToasterImports, GlobalAlertComponent, NgIconsModule],
  templateUrl: './app.html',
})
export class App {
  private readonly themeService = inject(ThemeService);
  protected readonly title = signal('Cadence');
}
