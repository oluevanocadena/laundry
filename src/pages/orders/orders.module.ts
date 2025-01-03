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
import { OrdersLaundryComponent } from './components/laundry/orders-laundry.component';
import { OrdersTopBarComponent } from './components/top-bar/orders-top-bar.component';
import { OrdersDetailPageComponent } from './detail/order-detail-page.component';
import { OrdersDraftPageComponent } from './draft/orders-draft-page.component';
import { OrdersTotalSummaryComponent } from './components/total-summary/orders-total-summary.component';
import { OrdersNotesComponent } from './components/notes/orders-notes.component';
import { OrdersItemsComponent } from './components/items/orders-items.component';
import { OrdersCustomerComponent } from './components/customer/orders-customer.component';
import { OrdersHeaderComponent } from './components/header/orders-header.component';
import { OrdersSummaryComponent } from './components/summary/orders-summary.component';

const components: any[] = [
  OrdersCustomerComponent,
  OrdersDetailPageComponent,
  OrdersDraftPageComponent,
  OrdersItemsComponent,
  OrdersLaundryComponent,
  OrdersNotesComponent,
  OrdersTopBarComponent,
  OrdersTotalSummaryComponent,
  OrdersHeaderComponent,
  OrdersSummaryComponent,
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