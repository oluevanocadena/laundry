import { Component, TemplateRef, ViewChild } from '@angular/core';
import { NavigationStart, Router, RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import {
  NzNotificationComponent,
  NzNotificationService,
} from 'ng-zorro-antd/notification';

import moment from 'moment';
import 'moment/locale/es';
moment.locale('es');

import { NotificationsDomain } from '@bussiness/notifications/doamins/notifications.domain';
import { NotificationsApiService } from '@bussiness/notifications/services/notifications.api.services';
import { SessionFacade } from '@bussiness/session/controllers/session.facade';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';
import { DirectivesModule } from '@directives/directives.module';
import { PagesModule } from '@pages/pages.module';
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
  @ViewChild('notificationBtnTpl', { static: true }) btnTemplate!: TemplateRef<{
    $implicit: NzNotificationComponent;
  }>;

  constructor(
    private sessionFacade: SessionFacade,
    private router: Router,
    private notifService: NotificationsApiService,
    private nzNotificationService: NzNotificationService
  ) {}

  /**
   * Lifecycle
   */
  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.sessionFacade.checkProfileCompletion();
      }
    });

    this.notifService.listenNotifications((n) => {
      const type = NotificationsDomain.notificationType(n.Event);
      const notification = this.nzNotificationService.create(
        type,
        n.Title,
        n.Message
      );
      notification.onClick.subscribe(() => {
        const metadata = JSON.parse(n.Metadata);
        this.router.navigate([NotificationsDomain.getUrlMap(n.Entity, metadata.id)]);
      });
    });
  }
}
