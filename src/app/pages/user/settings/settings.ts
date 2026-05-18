import { Component, inject, signal , ChangeDetectionStrategy } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { SettingsProfileComponent } from '@app/components/user/settings-profile/settings-profile';
import { SettingsMfaComponent } from '@app/components/user/settings-mfa/settings-mfa';
import { SettingsChangePasswordComponent } from '@app/components/user/settings-change-password/settings-change-password';
import { HlmSkeletonImports } from '@spartan-ng/helm/skeleton';
import { SettingsService } from '@app/core/services/settings.service';
import { User } from '@app/core/models/user.model';
import { ThemeService } from '@app/core/services/theme.service';
import { NgClass } from '@angular/common';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { lucideSun, lucideMoon } from '@ng-icons/lucide';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-settings',
  imports: [SettingsProfileComponent, SettingsMfaComponent, SettingsChangePasswordComponent, HlmSkeletonImports, NgClass, NgIconComponent],
  providers: [provideIcons({ lucideSun, lucideMoon })],
  templateUrl: './settings.html',
})
export class SettingsComponent {
  public themeService = inject(ThemeService);
  public settingsService = inject(SettingsService);
  profile = signal<User | null>(null);
  mfaDialogState = signal<'closed' | 'open'>('closed');
  changePasswordDialogState = signal<'closed' | 'open'>('closed');

  ngOnInit() {
    this.settingsService.getUserProfile().subscribe((profile) => {
      this.profile.set(profile);
    });
  }
}
