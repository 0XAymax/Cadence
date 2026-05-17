import { Component , ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-admin-dashboard",
    templateUrl: "./dashboard.html",
})
export class AdminDashboard {}