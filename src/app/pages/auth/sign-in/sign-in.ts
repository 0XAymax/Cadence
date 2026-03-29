import { Component } from '@angular/core';
import { LucideAngularModule, Eye, EyeOff, BookOpen } from 'lucide-angular';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '@app/components/logo/Logo';

@Component({
  selector: 'app-sign-in',
  imports: [
    LucideAngularModule,
    ...HlmButtonImports,
    ...HlmInputImports,
    ...HlmLabelImports,
    ...HlmCardImports,
    ...HlmSeparatorImports,
    RouterLink,
    LogoComponent,
  ],
  templateUrl: './sign-in.html',
})
export class SignIn {
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly BookOpen = BookOpen;

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
