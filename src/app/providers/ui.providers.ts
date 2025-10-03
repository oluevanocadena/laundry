import { Provider } from '@angular/core';
import { of } from 'rxjs';

import { provideEventPlugins } from '@taiga-ui/event-plugins';
import { TUI_LANGUAGE, TUI_SPANISH_LANGUAGE } from '@taiga-ui/i18n';
import { provideNzConfig } from 'ng-zorro-antd/core/config';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { MenuService, NzIsMenuInsideDropDownToken, NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalService } from 'ng-zorro-antd/modal';

/**
 * Providers para componentes y servicios de UI
 */
export const uiProviders: (Provider | any)[] = [
  { provide: TUI_LANGUAGE, useValue: of(TUI_SPANISH_LANGUAGE) },
  { provide: NzIsMenuInsideDropDownToken, useValue: false },
  { provide: NZ_I18N, useValue: es_ES },
  provideEventPlugins(),
  provideNzConfig({ modal: { nzDirection: 'ltr' } }),
  MenuService,
  NzMenuModule,
  NzModalService,
];
