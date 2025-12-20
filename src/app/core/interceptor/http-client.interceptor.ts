import { HttpInterceptorFn } from '@angular/common/http';

export const httpClientInterceptor: HttpInterceptorFn = (req, next) => {
  const cloned = req.clone({
      setHeaders: {
      'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
    }
    });
    return next(cloned);
};
