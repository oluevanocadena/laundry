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
import { CustomersAddressComponent } from './components/address/customers-address.component';
import { CustomersConfirmDeleteModalComponent } from './components/header/components/customers-confirm-delete-modal/customers-confirm-delete-modal.component';
import { CustomersConfirmDisableModalComponent } from './components/header/components/customers-confirm-disable-modal/customers-confirm-disable-modal.component';
import { CustomersHeaderComponent } from './components/header/customers-header.component';
import { CustomersNotesComponent } from './components/notes/customers-notes.component';
import { CustomersSummaryComponent } from './components/summary/customers-summary.component';
import { CustomersTopBarComponent } from './components/top-bar/customers-top-bar.component';
import { CustomersPageComponent } from './customers-page.component';
import { CustomersDetailComponent } from './detail/customers-detail.component';
import { CustomersDraftComponent } from './draft/customers-draft.component';

const components: any[] = [
  CustomersAddressComponent,
  CustomersConfirmDeleteModalComponent,
  CustomersConfirmDisableModalComponent,
  CustomersDetailComponent,
  CustomersDraftComponent,
  CustomersHeaderComponent,
  CustomersNotesComponent,
  CustomersPageComponent,
  CustomersSummaryComponent,
  CustomersTopBarComponent,
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
export class CustomersModule {}
