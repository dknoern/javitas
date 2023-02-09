
import { Injectable } from "@angular/core";
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { CognitoService } from "./cognito.service";

@Injectable({providedIn:'root'})
export class AuthorizeGuard implements CanActivate{
    constructor(private authService: CognitoService,
        private route: ActivatedRoute,
        private router: Router)
    {
    }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      return this.authService.isAuthenticated()
          .then(authenticated => {
              if (authenticated) {
                  return true;
              } else {
                  localStorage.setItem('auth_redirect_url', state.url);
                  this.router.navigate(['/examples/login']);
                  return false;
              }
          });
  }
}