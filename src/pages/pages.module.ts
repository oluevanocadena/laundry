import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UICommonModule } from '../components/common/common.modulte';
import { NgZorroModule } from '../components/ng-zorro.module';
import { TUIModule } from '../components/tui.module';
import { UIModule } from '../components/ui.module';
import { DirectivesModule } from '../directives/directives.module';
import { BoardModule } from './board/board.module';
import { CustomersModule } from './customers/customers.module';
import { HomeComponent } from './home/home.component';
import { LocationsModule } from './locations/locations.module';
import { NotificationsModule } from './notifications/notifications.module';
import { OrdersModule } from './orders/orders.module';
import { ProductsModule } from './products/products.module';
import { ReportsModule } from './reports/reports.module';
import { LoginModule } from './session/login.module';
import { SettingsModule } from './settings/settings.module';
import { SupportModule } from './support/support.module';
import { UsersModule } from './users/users.module';
import { UIPublicModule } from '../components/public/public.modulte';

const components = [HomeComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UIModule,
    UICommonModule,
    UIPublicModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,
    LoginModule,

    BoardModule,
    CustomersModule,
    LocationsModule,
    NotificationsModule,
    OrdersModule,
    ProductsModule,
    ReportsModule,
    SettingsModule,
    UsersModule,
    SupportModule,
  ],
  declarations: components,
  exports: components,
})
export class PagesModule {}
