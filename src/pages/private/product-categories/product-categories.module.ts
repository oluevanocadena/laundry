import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';

import { RouterModule } from '@angular/router';
import { ProductCategoriesConfirmDeleteModalComponent } from '@pages/private/product-categories/components/product-categories-confirm-delete-modal/product-categories-confirm-delete-modal.component';
import { ProductCategoriesConfirmDisableModalComponent } from '@pages/private/product-categories/components/product-categories-confirm-disable-modal/product-categories-confirm-disable-modal.component';
import { ProductCategoriesDrawerDraftComponent } from '@pages/private/product-categories/components/product-categories-drawer-draft/product-categories-drawer-draft.component';
import { ProductCategoriesPageComponent } from '@pages/private/product-categories/product-categories.component';

const components = [
  ProductCategoriesConfirmDeleteModalComponent,
  ProductCategoriesConfirmDisableModalComponent,
  ProductCategoriesDrawerDraftComponent,
  ProductCategoriesPageComponent,
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
  ],
  declarations: components,
  exports: components,
})
export class ProductCategoriesModule {}
