import { Component, inject , ChangeDetectionStrategy } from '@angular/core';
import { AlertService } from './alert.service';
import { NgIconsModule } from '@ng-icons/core';
import { HlmAlertImports } from '@spartan-ng/helm/alert';
import { HlmButtonImports } from '@spartan-ng/helm/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-global-alert',
  templateUrl: './alert.html',
  imports: [NgIconsModule, HlmAlertImports, HlmButtonImports],
})
export class GlobalAlertComponent {
  alertService = inject(AlertService);

  onAction() {
    this.alertService.triggerAction();
  }
}
