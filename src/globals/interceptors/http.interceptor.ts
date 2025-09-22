import { HttpRequest, HttpHandlerFn, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from '@app/routes';
import { supabaseClient } from '@globals/singleton/supabase.client';

export const AuthInterceptor = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  const router = inject(Router);
  const client = supabaseClient;

  return next(req).pipe(
    catchError((error) => {
      if (error.status === 401 || error.status === 403) {
        // Cerrar sesión en Supabase
        client.auth.signOut();

        // Redirigir al login
        router.navigate([routes.Login]);
      }

      return throwError(() => error);
    }),
  );
};
