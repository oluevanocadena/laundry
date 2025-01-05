import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UICommonModule } from '../../components/common/common.modulte';
import { NgZorroModule } from '../../components/ng-zorro.module';
import { TUIModule } from '../../components/tui.module';
import { UIModule } from '../../components/ui.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ServicesModule } from '../../services/services.module';
import { OrdersAdjustDeliveryComponent } from './components/adjust-delivery/orders-adjust-delivery.component';
import { OrdersAdjustQuantityComponent } from './components/adjust-quantity/orders-adjust-quantity.component';
import { OrdersCollectPaymentComponent } from './components/collect-payment/orders-collect-payment.component';
import { OrdersCustomerComponent } from './components/customer/orders-customer.component';
import { OrdersDeliveryComponent } from './components/delivery/orders-delivery.component';
import { OrdersHeaderComponent } from './components/header/orders-header.component';
import { OrdersItemsComponent } from './components/items/orders-items.component';
import { OrdersLaundryComponent } from './components/laundry/orders-laundry.component';
import { OrdersNotesComponent } from './components/notes/orders-notes.component';
import { OrdersSearchProductComponent } from './components/search-product/orders-search-product.component';
import { OrdersSummaryComponent } from './components/summary/orders-summary.component';
import { OrdersTopBarComponent } from './components/top-bar/orders-top-bar.component';
import { OrdersDetailPageComponent } from './detail/order-detail-page.component';
import { OrdersDraftPageComponent } from './draft/orders-draft-page.component';
import { OrdersSearchCustomerComponent } from './components/search-customer/orders-search-customer.component';
import { OrdersAdjustDiscountComponent } from './components/adjust-discount/orders-adjust-discount.component';

const components: any[] = [
  OrdersAdjustDeliveryComponent,
  OrdersAdjustDiscountComponent,
  OrdersAdjustQuantityComponent,
  OrdersCollectPaymentComponent,
  OrdersCustomerComponent,
  OrdersDeliveryComponent,
  OrdersDetailPageComponent,
  OrdersDraftPageComponent,
  OrdersHeaderComponent,
  OrdersItemsComponent,
  OrdersLaundryComponent,
  OrdersNotesComponent,
  OrdersSearchCustomerComponent,
  OrdersSearchProductComponent,
  OrdersSummaryComponent,
  OrdersTopBarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UIModule,
    UICommonModule,
    PipesModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,
    ServicesModule,
  ],
  declarations: components,
  exports: components,
})
export class OrdersModule {}
