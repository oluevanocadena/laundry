import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UICommonModule } from '../../components/common/common.modulte';
import { NgZorroModule } from '../../components/ng-zorro.module';
import { TUIModule } from '../../components/tui.module';
import { UIModule } from '../../components/ui.module';
import { DirectivesModule } from '../../directives/directives.module';
import { BoardPageComponent } from './board-page.component';
import { BoardDrawerMenuComponent } from './components/drawer-menu/board-drawer-menu.component';
import { DrawerNoticationsComponent } from './components/drawer-notications/drawer-notications.component';
import { BoardProfileMenuComponent } from './components/profile-menu/board-profile-menu.component';
import { BoardSearchBarComponent } from './components/search-bar/board-search-bar.component';
import { BoardTablePaginationComponent } from './components/table-pagination/board-table-pagination.component';
import { BoardTableComponent } from './components/table/board-table.component';
import { BoardTableAmountComponent } from './components/table/components/amount/board-table-amount.component';
import { BoardTableCustomerComponent } from './components/table/components/customer/board-table-customer.component';
import { BoardTableDueDateComponent } from './components/table/components/due-date/board-table-due-date.component';
import { BoardTableIdComponent } from './components/table/components/id/board-table-id.component';
import { BoardTableOrderStatusComponent } from './components/table/components/order-status/board-table-order-status.component';
import { BoardTopBarComponent } from './components/top-bar/board-top-bar.component';
import { PipesModule } from '../../pipes/pipes.module';

const components = [
  BoardDrawerMenuComponent,
  BoardPageComponent,
  BoardProfileMenuComponent,
  BoardSearchBarComponent,
  BoardTableComponent,
  BoardTablePaginationComponent,
  BoardTopBarComponent,
  DrawerNoticationsComponent,
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
  ],
  declarations: components,
  exports: components,
})
export class BoardModule {}
