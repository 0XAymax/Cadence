import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule, Eye, EyeOff } from 'lucide-angular';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';
import { HlmLabelImports } from '@spartan-ng/helm/label';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { LogoComponent } from '@app/components/logo/Logo';
import { form, required, email, FormRoot, FormField } from '@angular/forms/signals';

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
    FormRoot,
    FormField
],
  templateUrl: './sign-up.html',
})
export class SignUp {
  readonly singupModel = signal({ firstName: '', lastName: '', email: '', password: '' });
  readonly Eye = Eye;
  readonly EyeOff = EyeOff;

  showPassword = false;
  SignUpForm = form(this.singupModel, (schema) => {
    required(schema.firstName, {message: "First Name is required"});
    required(schema.lastName, { message: 'Last Name is required' });
    required(schema.email, { message: 'Email is required' });
    email(schema.email, { message: 'Please enter a valid email adress' });
    required(schema.password, { message: 'Password is required' });
  }, {
    submission: {
      action: async() => {
        const credentials = this.singupModel();
        console.log("Registered Data", credentials)
      },
    }
  });

  togglePassword() {
    this.showPassword = !this.showPassword;
  }
}
