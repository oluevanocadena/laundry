import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../../components/common/common.modulte';
import { NgZorroModule } from '../../components/ng-zorro.module';
import { TUIModule } from '../../components/tui.module';
import { UIModule } from '../../components/ui.module';
import { DirectivesModule } from '../../directives/directives.module';
import { BoardModule } from '../board/board.module';
import { LoginModule } from '../session/login.module';
import { OrdersDetailPageComponent } from './detail/order-detail-page.component';
import { OrdersDraftPageComponent } from './draft/orders-draft-page.component';

const components: any[] = [OrdersDraftPageComponent, OrdersDetailPageComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    UICommonModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,
    LoginModule,
    BoardModule,
  ],
  declarations: components,
  exports: components,
})
export class OrdersModule {}
