import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';

import { CustomersAddressComponent } from '@private/customers/components/address/customers-address.component';
import { CustomersCreateModalComponent } from '@private/customers/components/create-modal/customers-create-modal.component';
import { CustomersConfirmDeleteModalComponent } from '@private/customers/components/header/components/customers-confirm-delete-modal/customers-confirm-delete-modal.component';
import { CustomersConfirmDisableModalComponent } from '@private/customers/components/header/components/customers-confirm-disable-modal/customers-confirm-disable-modal.component';
import { CustomersHeaderComponent } from '@private/customers/components/header/customers-header.component';
import { CustomersNotesComponent } from '@private/customers/components/notes/customers-notes.component';
import { CustomersSummaryComponent } from '@private/customers/components/summary/customers-summary.component';
import { CustomersTopBarComponent } from '@private/customers/components/top-bar/customers-top-bar.component';
import { CustomersPageComponent } from '@private/customers/customers-page.component';
import { CustomersDraftComponent } from '@private/customers/draft/customers-draft.component';

const components: any[] = [
  CustomersAddressComponent,
  CustomersConfirmDeleteModalComponent,
  CustomersConfirmDisableModalComponent,
  CustomersCreateModalComponent,
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
  ],
  declarations: components,
  exports: components,
})
export class CustomersModule {}
