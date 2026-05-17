import { Component , ChangeDetectionStrategy } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
    selector: "app-admin-users",
    templateUrl: "./users.html",
})
export class AdminUsers {}