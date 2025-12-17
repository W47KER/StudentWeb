import { HttpInterceptorFn } from '@angular/common/http';

export const httpClientInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req);
};
