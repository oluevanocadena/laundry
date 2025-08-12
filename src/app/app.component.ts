import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { UICommonModule } from '../components/common/common.module';
import { NgZorroModule } from '../components/ng-zorro.module';
import { TUIModule } from '../components/tui.module';
import { UIModule } from '../components/ui.module';
import { DirectivesModule } from '../directives/directives.module';
import { PagesModule } from '../pages/pages.module';
import { SettingsService } from '../services/settings.services';
import { CookiesService } from '../services/common/cookie.service';
import { Session } from 'inspector';
import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UIModule,
    PagesModule,
    UICommonModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,
    TuiRoot,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  // protected readonly switcher = inject(TuiLanguageSwitcherService);
  constructor(
    public settingsService: SettingsService,
    public cookiesService: CookiesService<Session>
  ) {
    this.cookiesService.setUserInfo({
      Organization: {
        id: '7578c6ad-536a-4d4b-a612-d10ac8c5823e',
        Name: 'Brikerr Laundry',
        PlanId: null,
        created_at: moment().format('DD/MM/YYYY'),
        Deleted: false,
        Disabled: false,
      },
    });
    console.log('🚩 cookiesService', this.cookiesService.UserInfo);
  }
}
