import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';
import { DirectivesModule } from '@directives/directives.module';
import { CustomersModule } from '@pages/private/customers/customers.module';
import { PipesModule } from '@pipes/pipes.module';

import { OrdersAdjustDeliveryTrackingComponent } from '@pages/private/orders/components/adjust-delivery-tracking/orders-adjust-delivery-tracking.component';
import { OrdersAdjustDeliveryComponent } from '@pages/private/orders/components/adjust-delivery/orders-adjust-delivery.component';
import { OrdersAdjustDiscountComponent } from '@pages/private/orders/components/adjust-discount/orders-adjust-discount.component';
import { OrdersAdjustQuantityComponent } from '@pages/private/orders/components/adjust-quantity/orders-adjust-quantity.component';
import { OrdersCollectPaymentComponent } from '@pages/private/orders/components/collect-payment/orders-collect-payment.component';
import { OrdersCustomerComponent } from '@pages/private/orders/components/customer/orders-customer.component';
import { OrdersDeliveryComponent } from '@pages/private/orders/components/delivery/orders-delivery.component';
import { OrdersHeaderComponent } from '@pages/private/orders/components/header/orders-header.component';
import { OrdersItemDescriptionComponent } from '@pages/private/orders/components/item-description/orders-item-description.component';
import { OrdersItemPricingComponent } from '@pages/private/orders/components/item-pricing/orders-item-pricing.component';
import { OrdersItemsProcessingStatusComponent } from '@pages/private/orders/components/items-processing-status/orders-items-processing-status.component';
import { OrdersItemsProcessingComponent } from '@pages/private/orders/components/items-processing/orders-items-processing.component';
import { OrdersItemsComponent } from '@pages/private/orders/components/items/orders-items.component';
import { OrdersLaundryComponent } from '@pages/private/orders/components/laundry/orders-laundry.component';
import { OrdersNotesComponent } from '@pages/private/orders/components/notes/orders-notes.component';
import { OrdersConfirmDeleteModalComponent } from '@pages/private/orders/components/orders-confirm-delete-modal/orders-confirm-delete-modal.component';
import { OrdersConfirmDisableModalComponent } from '@pages/private/orders/components/orders-confirm-disable-modal/orders-confirm-disable-modal.component';
import { OrdersPrintComponent } from '@pages/private/orders/components/print/orders-print.component';
import { OrdersSearchCustomerComponent } from '@pages/private/orders/components/search-customer/orders-search-customer.component';
import { OrdersSearchProductComponent } from '@pages/private/orders/components/search-product/orders-search-product.component';
import { OrdersSummaryComponent } from '@pages/private/orders/components/summary/orders-summary.component';
import { OrdersTopBarComponent } from '@pages/private/orders/components/top-bar/orders-top-bar.component';
import { OrdersDetailPageComponent } from '@pages/private/orders/detail/order-detail-page.component';
import { OrdersDraftPageComponent } from '@pages/private/orders/draft/orders-draft-page.component';
import { OrdersPageComponent } from '@pages/private/orders/orders-page.component';

const components: any[] = [
  OrdersAdjustDeliveryComponent,
  OrdersAdjustDeliveryTrackingComponent,
  OrdersAdjustDiscountComponent,
  OrdersAdjustQuantityComponent,
  OrdersCollectPaymentComponent,
  OrdersConfirmDeleteModalComponent,
  OrdersConfirmDisableModalComponent,
  OrdersCustomerComponent,
  OrdersDeliveryComponent,
  OrdersDetailPageComponent,
  OrdersDraftPageComponent,
  OrdersHeaderComponent,
  OrdersItemDescriptionComponent,
  OrdersItemPricingComponent,
  OrdersItemsComponent,
  OrdersItemsProcessingComponent,
  OrdersItemsProcessingStatusComponent,
  OrdersLaundryComponent,
  OrdersNotesComponent,
  OrdersPageComponent,
  OrdersPrintComponent,
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
    UIAtomsModule,
    UICommonModule,
    PipesModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,
    CustomersModule,
  ],
  declarations: components,
  exports: components,
})
export class OrdersModule {}
