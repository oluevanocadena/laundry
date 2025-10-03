import { Routes } from '@angular/router';
import { CanDeactivateGuard } from '@guards/deactivate.guard';

import { SessionGuard } from '@guards/session.guard';
import { AnalyticsPageComponent } from '@pages/private/analytics/analytics-page.component';

import { CustomersPageComponent } from '@pages/private/customers/customers-page.component';
import { CustomersDraftComponent } from '@pages/private/customers/draft/customers-draft.component';
import { HomeComponent } from '@pages/private/home/home.component';
import { LocationsPageComponent } from '@pages/private/locations/locations.component';
import { NotificationsPageComponent } from '@pages/private/notifications/notifications.component';
import { OrdersDraftPageComponent } from '@pages/private/orders/draft/orders-draft-page.component';
import { OrdersPageComponent } from '@pages/private/orders/orders-page.component';
import { PluginsPageComponent } from '@pages/private/plugins/plugins-page.component';
import { PosPageComponent } from '@pages/private/pos/pos-page.component';
import { ProductCategoriesPageComponent } from '@pages/private/product-categories/product-categories.component';
import { ProductsDraftComponent } from '@pages/private/products/draft/products-draft.component';
import { ProductsPageComponent } from '@pages/private/products/products-page.component';
import { ReportsPageComponent } from '@pages/private/reports/reports.component';
import { InvitationConfirmComponent } from '@pages/private/session/invitation-confirm/invitation-confirm.component';
import { LoginPageComponent } from '@pages/private/session/login/login-page.component';
import { RegisterConfirmComponent } from '@pages/private/session/register-confirm/register-confirm.component';
import { RegisterPageComponent } from '@pages/private/session/register/register-page.component';
import { SettingsBillingPageComponent } from '@pages/private/settings/pages/billing/settings-billing-page.component';
import { SettingsPageComponent } from '@pages/private/settings/pages/general/settings-page.component';
import { SettingsPointOfSalePageComponent } from '@pages/private/settings/pages/point-of-sale/settings-point-of-sale-page.component';
import { SettingsSubsctiptionPlanPageComponent } from '@pages/private/settings/pages/subsctiption-plan/settings-subsctiption-plan-page.component';
import { SetupPageComponent } from '@pages/private/setup/setup.component';
import { SettingsStorePageComponent } from '@pages/private/store/pages/store/settings-store-page.component';
import { SupportDraftPageComponent } from '@pages/private/support/draft/support-draft-page.component';
import { SupportPageComponent } from '@pages/private/support/support.component';
import { UsersDraftComponent } from '@pages/private/users/draft/users-draft.component';
import { UsersPageComponent } from '@pages/private/users/users.component';

import { LandingComponent } from '@pages/public/landing/landing.component';
import { PricingComponent } from '@pages/public/pricing/pricing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', canActivate: [SessionGuard], component: HomeComponent },
  { path: 'setup', canActivate: [SessionGuard], component: SetupPageComponent },

  {
    path: 'analytics',
    canActivate: [SessionGuard],
    component: AnalyticsPageComponent,
  },
  {
    path: 'plugins',
    canActivate: [SessionGuard],
    component: PluginsPageComponent,
  },
  {
    path: 'customers',
    canActivate: [SessionGuard],
    component: CustomersPageComponent,
  },
  {
    path: 'customers/draft',
    canActivate: [SessionGuard],
    component: CustomersDraftComponent,
  },
  {
    path: 'locations',
    canActivate: [SessionGuard],
    component: LocationsPageComponent,
  },
  {
    path: 'notifications',
    canActivate: [SessionGuard],
    component: NotificationsPageComponent,
  },
  {
    path: 'orders',
    canActivate: [SessionGuard],
    component: OrdersPageComponent,
  },
  {
    path: 'orders/draft',
    canActivate: [SessionGuard],
    canDeactivate: [CanDeactivateGuard],
    component: OrdersDraftPageComponent,
  },
  {
    path: 'pos',
    canActivate: [SessionGuard],
    component: PosPageComponent,
  },
  {
    path: 'product-categories',
    canActivate: [SessionGuard],
    component: ProductCategoriesPageComponent,
  },
  {
    path: 'products',
    canActivate: [SessionGuard],
    component: ProductsPageComponent,
  },
  {
    path: 'products/draft',
    canActivate: [SessionGuard],
    component: ProductsDraftComponent,
  },
  { path: 'users', canActivate: [SessionGuard], component: UsersPageComponent },
  { path: 'users/draft', canActivate: [SessionGuard], component: UsersDraftComponent },
  {
    path: 'reports',
    canActivate: [SessionGuard],
    component: ReportsPageComponent,
  },
  {
    path: 'store',
    redirectTo: 'store/general',
    pathMatch: 'full',
  },
  {
    path: 'store/general',
    canActivate: [SessionGuard],
    component: SettingsStorePageComponent,
  },
  {
    path: 'store/customization',
    canActivate: [SessionGuard],
    component: SettingsStorePageComponent,
  },
  {
    path: 'store/domains',
    canActivate: [SessionGuard],
    component: SettingsStorePageComponent,
  },
  {
    path: 'store/support',
    canActivate: [SessionGuard],
    component: SettingsStorePageComponent,
  },
  {
    path: 'settings',
    redirectTo: 'settings/general',
    pathMatch: 'full',
  },
  {
    path: 'settings/general',
    canActivate: [SessionGuard],
    component: SettingsPageComponent,
  },
  {
    path: 'settings/point-of-sale',
    canActivate: [SessionGuard],
    component: SettingsPointOfSalePageComponent,
  },
  {
    path: 'settings/subscription',
    canActivate: [SessionGuard],
    component: SettingsSubsctiptionPlanPageComponent,
  },
  {
    path: 'settings/billing',
    canActivate: [SessionGuard],
    component: SettingsBillingPageComponent,
  },
  {
    path: 'settings/point-of-sale',
    canActivate: [SessionGuard],
    component: SettingsPageComponent,
  },

  { path: 'support', component: SupportPageComponent },
  { path: 'support/draft', component: SupportDraftPageComponent },

  { path: 'register', component: RegisterPageComponent },
  { path: 'register-confirmation', component: RegisterConfirmComponent },
  { path: 'invitation-confirmation', component: InvitationConfirmComponent },

  { path: 'login', component: LoginPageComponent },
  { path: 'pricing', component: PricingComponent },
  { path: '**', redirectTo: '' },
];
