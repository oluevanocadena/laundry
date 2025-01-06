import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../components/common/common.modulte';
import { NgZorroModule } from '../components/ng-zorro.module';
import { TUIModule } from '../components/tui.module';
import { UIModule } from '../components/ui.module';
import { DirectivesModule } from '../directives/directives.module';
import { HomeComponent } from './home/home.component';
import { LoginModule } from './session/login.module';
import { BoardModule } from './board/board.module';
import { SettingsModule } from './settings/settings.module';
import { OrdersModule } from './orders/orders.module';
import { RouterModule } from '@angular/router';
import { CustomersModule } from './customers/customers.module';
import { ProductsModule } from './products/products.module';

const components = [HomeComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UIModule,
    UICommonModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,
    LoginModule,
    BoardModule,
    SettingsModule,
    OrdersModule,
    CustomersModule,
    ProductsModule,
  ],
  declarations: components,
  exports: components,
})
export class PagesModule {}
