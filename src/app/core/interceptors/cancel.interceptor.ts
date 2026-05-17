import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpCancelService } from '../services/http-cancel.service';
import { takeUntil } from 'rxjs';

export const cancelInterceptor: HttpInterceptorFn = (req, next) => {
  const cancelService = inject(HttpCancelService);

  // Allow explicitly bypassing cancellation for critical background tasks
  if (req.headers.has('X-No-Cancel')) {
    const cleanReq = req.clone({ headers: req.headers.delete('X-No-Cancel') });
    return next(cleanReq);
  }

  return next(req).pipe(
    takeUntil(cancelService.onCancelPendingRequests())
  );
};
