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
import { PipesModule } from '@pipes/pipes.module';

import { ProductsAvailabilityComponent } from '@private/products/components/availability/products-availability.component';
import { ProductsGeneralsComponent } from '@private/products/components/generals/products-generals.component';
import { ProductsConfirmDeleteModalComponent } from '@private/products/components/header/components/products-confirm-delete-modal/products-confirm-delete-modal.component';
import { ProductsHeaderComponent } from '@private/products/components/header/products-header.component';
import { ProductsMediaComponent } from '@private/products/components/media/products-media.component';
import { ProductsPrincingComponent } from '@private/products/components/princing/products-princing.component';
import { ProductsDraftComponent } from '@private/products/draft/products-draft.component';
import { ProductsPageComponent } from '@private/products/products-page.component';

const components: any[] = [
  ProductsAvailabilityComponent,
  ProductsDraftComponent,
  ProductsGeneralsComponent,
  ProductsHeaderComponent,
  ProductsMediaComponent,
  ProductsPageComponent,
  ProductsPrincingComponent,
  ProductsConfirmDeleteModalComponent,
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
export class ProductsModule {}
