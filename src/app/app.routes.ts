import { Routes } from '@angular/router';
import { HomeComponent } from '../pages/home/home.component';
import { LoginPageComponent } from '../pages/session/login/login-page.component';
import { RegisterPageComponent } from '../pages/session/register/register-page.component';
import { BoardPageComponent } from '../pages/board/board-page.component';
import { SettingsPageComponent } from '../pages/settings/settings-page.component';
import { OrdersDraftPageComponent } from '../pages/orders/draft/orders-draft-page.component';
import { OrdersDetailPageComponent } from '../pages/orders/detail/order-detail-page.component';
import { CustomersDraftComponent } from '../pages/customers/draft/customers-draft.component';
import { CustomersDetailComponent } from '../pages/customers/detail/customers-detail.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterPageComponent },
  { path: 'board', component: BoardPageComponent },
  { path: 'orders/draft', component: OrdersDraftPageComponent },
  { path: 'orders/edit/:id', component: OrdersDraftPageComponent },
  { path: 'orders/detail/:id', component: OrdersDetailPageComponent },
  { path: 'customers/draft', component: CustomersDraftComponent },
  { path: 'customers/edit/:id', component: CustomersDraftComponent },
  { path: 'customers/detail/:id', component: CustomersDetailComponent },
  { path: 'settings', component: SettingsPageComponent },
  { path: '**', redirectTo: '' },
];
