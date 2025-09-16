import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { UIPublicModule } from '@components/public/public.modulte';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';
import { DirectivesModule } from '@directives/directives.module';

import { AnalyticsModule } from '@pages/private/analytics/analytics.module';
import { CustomersModule } from '@pages/private/customers/customers.module';
import { HomeModule } from '@pages/private/home/home.module';
import { LocationsModule } from '@pages/private/locations/locations.module';
import { NotificationsModule } from '@pages/private/notifications/notifications.module';
import { OrdersModule } from '@pages/private/orders/orders.module';
import { PluginsModule } from '@pages/private/plugins/plugins.module';
import { ProductCategoriesModule } from '@pages/private/product-categories/product-categories.module';
import { ProductsModule } from '@pages/private/products/products.module';
import { ReportsModule } from '@pages/private/reports/reports.module';
import { LoginModule } from '@pages/private/session/login.module';
import { SettingsModule } from '@pages/private/settings/settings.module';
import { SetupModule } from '@pages/private/setup/setup.module';
import { SupportModule } from '@pages/private/support/support.module';
import { UsersModule } from '@pages/private/users/users.module';

import { LandingModule } from '@pages/public/landing/landing.module';
import { PricingModule } from '@pages/public/pricing/pricing.module';

const components: any[] = [];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UIModule,
    UIAtomsModule,
    UICommonModule,
    UIPublicModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,

    AnalyticsModule,
    CustomersModule,
    HomeModule,
    LandingModule,
    LocationsModule,
    LoginModule,
    NotificationsModule,
    OrdersModule,
    PricingModule,
    ProductsModule,
    ProductCategoriesModule,
    ReportsModule,
    SettingsModule,
    SetupModule,
    SupportModule,
    UsersModule,
    PluginsModule,
  ],
  declarations: components,
  exports: components,
})
export class PagesModule {}
