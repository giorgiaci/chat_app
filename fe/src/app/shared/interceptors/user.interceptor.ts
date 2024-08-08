import { HttpInterceptorFn } from "@angular/common/http";
import { SecurityService } from "../security/security.service";
import { inject } from "@angular/core";

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authenticationService = inject(SecurityService);
  const user = authenticationService.userValue;

  const request = req.clone({
    setHeaders: {
      Authorization: `Bearer ${user?.token}`
    }
  });

  return next(request);
}