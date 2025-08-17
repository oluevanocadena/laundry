import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { routes } from '@app/routes';
import { SessionApiService } from '@bussiness/session/session.api.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(
    private sessionService: SessionApiService,
    private router: Router
  ) {}

  async canActivate(): Promise<boolean> {
    const user = this.sessionService.session.value;
    console.log(user);
    if (user) {
      console.log('🔒 Usuario autenticado');
      this.router.navigate([routes.Home]);
      return false;
    } else {
      console.log('🔒 Usuario no autenticado');
      return true;
    }
  }
}
