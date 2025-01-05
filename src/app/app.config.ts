import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withDebugTracing,
  withRouterConfig,
} from '@angular/router';
import { NG_EVENT_PLUGINS } from '@taiga-ui/event-plugins';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TUI_LANGUAGE, TUI_SPANISH_LANGUAGE } from '@taiga-ui/i18n';
import { routes } from './app.routes';
import { of } from 'rxjs';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
const ngZorroConfig: NzConfig = {
  modal: {
    nzDirection: 'ltr',
  },
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideNzConfig(ngZorroConfig),
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_SPANISH_LANGUAGE),
    },
    NG_EVENT_PLUGINS,
    NzModalService,
  ],
};
