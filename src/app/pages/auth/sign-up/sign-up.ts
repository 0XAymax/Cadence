import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { LogoComponent } from '@app/components/logo/Logo';

@Component({
  selector: 'app-sign-up',
  imports: [
    RouterLink,
    LucideAngularModule,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmLabelImports,
    ...HlmCardImports,
    LogoComponent,
  ],
  templateUrl: './sign-up.html',
})
export class SignUp {
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
