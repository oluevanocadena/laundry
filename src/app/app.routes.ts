import { Routes } from '@angular/router';
import { CanDeactivateGuard } from '@guards/deactivate.guard';
import { LoginGuard } from '@guards/login.guard';

import { SessionGuard } from '@guards/session.guard';

import { CustomersPageComponent } from '@pages/private/customers/customers-page.component';
import { CustomersDraftComponent } from '@pages/private/customers/draft/customers-draft.component';
import { HomeComponent } from '@pages/private/home/home.component';
import { LocationsPageComponent } from '@pages/private/locations/locations.component';
import { NotificationsPageComponent } from '@pages/private/notifications/notifications.component';
import { OrdersDraftPageComponent } from '@pages/private/orders/draft/orders-draft-page.component';
import { OrdersPageComponent } from '@pages/private/orders/orders-page.component';
import { ProductsDraftComponent } from '@pages/private/products/draft/products-draft.component';
import { ProductsPageComponent } from '@pages/private/products/products-page.component';
import { ReportsPageComponent } from '@pages/private/reports/reports.component';
import { LoginPageComponent } from '@pages/private/session/login/login-page.component';
import { RegisterConfirmComponent } from '@pages/private/session/register-confirm/register-confirm.component';
import { RegisterPageComponent } from '@pages/private/session/register/register-page.component';
import { SettingsPageComponent } from '@pages/private/settings/settings-page.component';
import { SetupPageComponent } from '@pages/private/setup/setup.component';
import { SupportPageComponent } from '@pages/private/support/support.component';
import { UsersPageComponent } from '@pages/private/users/users.component';
import { LandingComponent } from '@pages/public/landing/landing.component';
import { PricingComponent } from '@pages/public/pricing/pricing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', canActivate: [SessionGuard], component: HomeComponent },
  { path: 'setup', canActivate: [SessionGuard], component: SetupPageComponent },
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
    path: 'customers/edit/:id',
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
    path: 'orders/edit/:id',
    canActivate: [SessionGuard],
    component: OrdersDraftPageComponent,
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
  {
    path: 'products/edit/:id',
    canActivate: [SessionGuard],
    component: ProductsDraftComponent,
  },
  { path: 'users', canActivate: [SessionGuard], component: UsersPageComponent },
  {
    path: 'reports',
    canActivate: [SessionGuard],
    component: ReportsPageComponent,
  },
  {
    path: 'settings',
    canActivate: [SessionGuard],
    component: SettingsPageComponent,
  },

  { path: 'register', component: RegisterPageComponent },
  { path: 'register-confirmation', component: RegisterConfirmComponent },
  { path: 'support', component: SupportPageComponent },

  { path: 'login', component: LoginPageComponent },
  { path: 'pricing', component: PricingComponent },
  { path: '**', redirectTo: '' },
];
