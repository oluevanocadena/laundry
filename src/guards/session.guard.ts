import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { routes } from '@app/routes';
import { SessionService } from '@bussiness/session/services/session.service';

@Injectable({
  providedIn: 'root',
})
export class SessionGuard implements CanActivate {
  constructor(private sessionService: SessionService, private router: Router) {}

  async canActivate(): Promise<boolean> {
    if (this.sessionService.isLoggedIn) {
      console.log('🔒 Usuario autenticado');
      return true;
    } else {
      console.log('🔒 Usuario no autenticado');
      this.router.navigate([routes.Login]);
      return false;
    }
  }
}
