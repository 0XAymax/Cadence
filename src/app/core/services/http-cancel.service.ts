import { Injectable, inject } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class HttpCancelService {
  private cancelPendingRequests$ = new Subject<void>();

  constructor() {
    const router = inject(Router);
    router.events.pipe(
      filter(event => event instanceof NavigationStart)
    ).subscribe(() => {
      this.cancelPendingRequests$.next();
    });
  }

  public onCancelPendingRequests() {
    return this.cancelPendingRequests$.asObservable();
  }
}
