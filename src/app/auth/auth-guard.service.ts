import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, map, Observable, of, take } from 'rxjs';
import { AuthenticationService } from '../core/services/authentication.service';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(
    private authService: AuthenticationService, 
    private router: Router ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
      return this.authService.isAuthenticatedObservable().pipe(
          take(1),
          map(authenticated => {
            if(!authenticated){
              this.router.navigate(['login'], { queryParams: { redirectTo: state.url } });
              return false;
            }
            return true;
          }));
  }
}
