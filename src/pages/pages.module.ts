import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { UIPublicModule } from '@components/public/public.modulte';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';
import { DirectivesModule } from '@directives/directives.module';

import { CustomersModule } from '@pages/customers/customers.module';
import { HomeComponent } from '@pages/home/home.component';
import { LocationsModule } from '@pages/locations/locations.module';
import { NotificationsModule } from '@pages/notifications/notifications.module';
import { OrdersModule } from '@pages/orders/orders.module';
import { ProductsModule } from '@pages/products/products.module';
import { ReportsModule } from '@pages/reports/reports.module';
import { LoginModule } from '@pages/session/login.module';
import { SettingsModule } from '@pages/settings/settings.module';
import { SupportModule } from '@pages/support/support.module';
import { UsersModule } from '@pages/users/users.module';

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
