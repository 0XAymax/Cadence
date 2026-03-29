import { Component, signal } from '@angular/core';
import { LucideAngularModule, Eye, EyeOff, BookOpen } from 'lucide-angular';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { HlmSeparatorImports } from '@spartan-ng/helm/separator';
import { RouterLink } from '@angular/router';
import { LogoComponent } from '@app/components/logo/Logo';
import { form, FormField, required, email, submit, FormRoot } from '@angular/forms/signals';
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
    FormField,
    FormRoot,
  ],
  templateUrl: './sign-in.html',
})
export class SignIn {
  loginModel = signal({ email: '', password: '' });
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;
  readonly BookOpen = BookOpen;

  showPassword = false;

  loginForm = form(this.loginModel, (schema) => {
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Please enter a valid email address' });
    required(schema.password, { message: 'Password is required' });
  },{
  submission: {
    action: async () => {
      const credentials = this.loginModel();
      console.log('Logging in with:', credentials);
    }
  }});

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm().invalid()) {
      alert('Please fix the errors in the form before submitting.');
      return;
    }
    const credentials = this.loginModel();
    console.log('Logging in with:', credentials);
  }
}
