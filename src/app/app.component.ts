import { Component } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { PagesModule } from '@pages/pages.module';
import { TuiRoot } from '@taiga-ui/core';
import moment from 'moment';
import 'moment/locale/es';

import { routes } from './routes';

import { SessionFacade } from '@bussiness/session/controllers/session.facade';
import { UICommonModule } from '../components/common/common.module';
import { NgZorroModule } from '../components/ng-zorro.module';
import { TUIModule } from '../components/tui.module';
import { UIModule } from '../components/ui.module';
import { DirectivesModule } from '../directives/directives.module';
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
  constructor(public sessionFacade: SessionFacade, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.sessionFacade.checkProfileCompletion();
      }
    });
  }
}
