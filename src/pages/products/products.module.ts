import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UICommonModule } from '../../components/common/common.module';
import { NgZorroModule } from '../../components/ng-zorro.module';
import { TUIModule } from '../../components/tui.module';
import { UIModule } from '../../components/ui.module';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { ServicesModule } from '../../services/services.module';

import { ProductsHeaderComponent } from './components/products-header/products-header.component';
import { ProductsDraftComponent } from './draft/products-draft.component';
import { ProductsPageComponent } from './products-page.component';

const components: any[] = [
  ProductsPageComponent,
  ProductsDraftComponent,
  ProductsHeaderComponent,
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
export class ProductsModule {}
