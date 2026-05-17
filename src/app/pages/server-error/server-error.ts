import { Component, inject , ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { NgIconsModule } from '@ng-icons/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-server-error',
  standalone: true,
  imports: [HlmButtonImports, NgIconsModule],
  templateUrl: './server-error.html',
})
export class ServerErrorPage {
  private location = inject(Location);

  goBack() {
    this.location.back();
  }
}
