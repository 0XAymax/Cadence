import { Component , ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: "app-admin-settings",
  templateUrl: "./settings.html",
})
export class AdminSettings {}