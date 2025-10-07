import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';

import { OrdersModule } from '@pages/private/orders/orders.module';
import { PosCategoryTabsComponent } from '@pages/private/pos/components/category-tabs/pos-category-tabs.component';
import { PosProductCardComponent } from '@pages/private/pos/components/product-card/pos-product-card.component';
import { PosScannerModalComponent } from '@pages/private/pos/components/scanner-modal/pos-scanner-modal.component';
import { PosPageComponent } from '@pages/private/pos/pos-page.component';

const components = [PosPageComponent, PosScannerModalComponent, PosCategoryTabsComponent, PosProductCardComponent];

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
    NgZorroModule,
    TUIModule,
    NgZorroModule,
    OrdersModule,
  ],
  declarations: components,
  exports: components,
})
export class POSModule {}
