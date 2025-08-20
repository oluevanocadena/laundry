import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { routes } from '@app/routes';
import { SessionService } from '@bussiness/session/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (this.sessionService.isLoggedIn) {
      console.log('🔒 Usuario autenticado');
      this.router.navigate([routes.Home]);
      return false;
    } else {
      console.log('🔒 Usuario no autenticado');
      return true;
    }
  }
}
