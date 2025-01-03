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
import { BoardPageComponent } from './board-page.component';
import { BoardSearchBarComponent } from './components/search-bar/board-search-bar.component';
import { BoardTablePaginationComponent } from './components/table-pagination/board-table-pagination.component';
import { BoardTableComponent } from './components/table/board-table.component';
import { BoardTableAmountComponent } from './components/table/components/amount/board-table-amount.component';
import { BoardTableCustomerComponent } from './components/table/components/customer/board-table-customer.component';
import { BoardTableDueDateComponent } from './components/table/components/due-date/board-table-due-date.component';
import { BoardTableIdComponent } from './components/table/components/id/board-table-id.component';
import { BoardTableOrderStatusComponent } from './components/table/components/order-status/board-table-order-status.component';

const components = [
  BoardPageComponent,
  BoardSearchBarComponent,
  BoardTableComponent,
  BoardTablePaginationComponent,
  BoardTableIdComponent,
  BoardTableCustomerComponent,
  BoardTableAmountComponent,
  BoardTableDueDateComponent,
  BoardTableOrderStatusComponent,
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
export class BoardModule {}
