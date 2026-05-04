import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { LucideAngularModule, Mail, Smartphone, ShieldCheck } from 'lucide-angular';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmCardImports } from '@spartan-ng/helm/card';
import { MfaMethod } from "@app/core/models/mfa-type.model";
import { MfaService } from "@app/core/services/mfa.service";
import { finalize } from "rxjs";
import { toast } from 'ngx-sonner';
import  { LogoComponent } from "@app/components/logo/Logo";

@Component({
  selector: 'app-mfa-type',
  standalone: true,
  imports: [
    LucideAngularModule,
    ...HlmButtonImports,
    ...HlmCardImports,
    LogoComponent,
  ],
  templateUrl: './mfa-type.html',
})
export class MfaType{
  private mfaService = inject(MfaService);
  private router = inject(Router)
  readonly Mail = Mail; readonly Smartphone = Smartphone; readonly ShieldCheck = ShieldCheck;

  isLoading = signal(false);

  selectMethod(method: MfaMethod) {
    this.mfaService.selectedMethod.set(method);
    if (method === 'EMAIL') {
      this.isLoading.set(true);
      this.mfaService.triggerEmailCode()
        .pipe(finalize(() => this.isLoading.set(false)))
        .subscribe({
          next: () => this.router.navigate(['/auth/mfa/verify']),
          error: () => toast.error('Could not send email. Please try again.')
        })
    } else if (method === 'AUTHENTICATOR') {
      this.router.navigate(['/auth/mfa/verify']);
    }
  }
}