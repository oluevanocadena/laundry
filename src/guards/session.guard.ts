import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { routes } from '@app/routes';
import { SessionApiService } from '@bussiness/session/session.api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    private sessionService: SessionApiService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const user = this.sessionService.session.value;
    if (user) {
      console.log('🔒 Usuario autenticado');
      return true;
    } else {
      console.log('🔒 Usuario no autenticado');
      this.router.navigate([routes.Login]);
      return false;
    }
  }
}
