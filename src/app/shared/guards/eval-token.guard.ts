import { Injectable } from '@angular/core'
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanDeactivate, CanLoad, RouterStateSnapshot, UrlTree, Router } from '@angular/router'

import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { AuthService } from 'src/app/shared/services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class EvalTokenGuard implements CanActivate, CanActivateChild, CanDeactivate<unknown>, CanLoad {
  constructor (private readonly authService: AuthService,
    private readonly router: Router) {}

  canActivate (): Observable<boolean> | boolean {
    return this.authService.validToken
      .pipe(
        tap(valid => {
          if (!valid) {
            void this.router.navigateByUrl('/auth')
          }
        })
      )
  }

  canActivateChild (
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true
  }

  canDeactivate (
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true
  }

  canLoad (): Observable<boolean> | boolean {
    return this.authService.validToken
      .pipe(
        tap(valid => {
          if (!valid) {
            void this.router.navigateByUrl('/auth')
          }
        })
      )
  }
}
