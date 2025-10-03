import { registerLocaleData } from '@angular/common';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';

import es from '@angular/common/locales/es';
import * as moment from 'moment-timezone';

import { routes } from '@app/app.routes';
import { appProviders } from '@app/providers/index.providers';
import { AuthInterceptor } from '@globals/interceptors/http.interceptor';

registerLocaleData(es);
moment.tz.setDefault('America/Mexico_City');
// moment.tz.setDefault('UTC');

export const appConfig: ApplicationConfig = {
  providers: [
    // Angular core providers
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideClientHydration(withEventReplay()),
    provideRouter(routes),

    // HTTP interceptors
    provideHttpClient(withInterceptors([AuthInterceptor])),

    // App providers organizados por categoría
    ...appProviders,
  ],
};
