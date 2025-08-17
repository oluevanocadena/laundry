import { Routes } from '@angular/router';
import { LoginGuard } from '@guards/login.guard';

import { AuthGuard } from '@guards/session.guard';

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
import { RegisterCompletionComponent } from '@pages/private/session/register-completion/register-completion.component';
import { RegisterPageComponent } from '@pages/private/session/register/register-page.component';
import { SettingsPageComponent } from '@pages/private/settings/settings-page.component';
import { SupportPageComponent } from '@pages/private/support/support.component';
import { UsersPageComponent } from '@pages/private/users/users.component';
import { LandingComponent } from '@pages/public/landing/landing.component';
import { PricingComponent } from '@pages/public/pricing/pricing.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'customers', component: CustomersPageComponent },
  { path: 'customers/draft', component: CustomersDraftComponent },
  { path: 'customers/edit/:id', component: CustomersDraftComponent },
  { path: 'locations', component: LocationsPageComponent },
  { path: 'login', canActivate: [LoginGuard], component: LoginPageComponent },
  { path: 'notifications', component: NotificationsPageComponent },
  { path: 'orders', component: OrdersPageComponent },
  { path: 'orders/draft', component: OrdersDraftPageComponent },
  { path: 'orders/edit/:id', component: OrdersDraftPageComponent },
  { path: 'pricing', component: PricingComponent },
  { path: 'products', component: ProductsPageComponent },
  { path: 'products/draft', component: ProductsDraftComponent },
  { path: 'products/edit/:id', component: ProductsDraftComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'register-completion', component: RegisterCompletionComponent },
  { path: 'reports', component: ReportsPageComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: 'support', component: SupportPageComponent },
  { path: 'users', component: UsersPageComponent },
  { path: '**', redirectTo: '' },
];
