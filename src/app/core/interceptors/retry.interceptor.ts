import { HttpInterceptorFn } from '@angular/common/http';
import { retry, timer, throwError } from 'rxjs';

export const retryInterceptor: HttpInterceptorFn = (req, next) => {
  // Only retry GET requests to avoid side-effects on POST/PUT/DELETE
  if (req.method !== 'GET') {
    return next(req);
  }

  return next(req).pipe(
    retry({
      count: 2,
      delay: (error, retryCount) => {
        // Don't retry on 4xx errors (client errors), except 408 Timeout or 429 Rate Limit
        if (error.status && error.status >= 400 && error.status < 500 && error.status !== 408 && error.status !== 429) {
          return throwError(() => error);
        }
        
        // Exponential backoff: 1s, 2s
        return timer(Math.pow(2, retryCount - 1) * 1000);
      }
    })
  );
};
