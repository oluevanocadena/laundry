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
import { CustomersHeaderComponent } from './components/header/customers-header.component';
import { CustomersPageComponent } from './customers-page.component';
import { CustomersDetailComponent } from './detail/customers-detail.component';
import { CustomersDraftComponent } from './draft/customers-draft.component';
import { CustomersSummaryComponent } from './components/summary/customers-summary.component';
import { CustomersNotesComponent } from './components/notes/customers-notes.component';
import { CustomersAddressComponent } from './components/address/customers-address.component';
import { CustomersTopBarComponent } from './components/top-bar/customers-top-bar.component';

const components: any[] = [
  CustomersPageComponent,
  CustomersDraftComponent,
  CustomersDetailComponent,
  CustomersHeaderComponent,
  CustomersSummaryComponent,
  CustomersNotesComponent,
  CustomersAddressComponent,
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
