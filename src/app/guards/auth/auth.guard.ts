import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { isNull } from 'util';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {

  //Cette classe a permet de gérer l'opération de l'authentification

  constructor(
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    const isLoggedIn = !isNull(localStorage.getItem('user'));

    if (!isLoggedIn) { //si l'utilisateur n'a pas encore connecter
      this.router.navigate(['/login']); //aller vers login
    }
    return isLoggedIn;
  }
}
