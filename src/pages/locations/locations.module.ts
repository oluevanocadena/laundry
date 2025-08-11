import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UICommonModule } from '../../components/common/common.modulte';
import { NgZorroModule } from '../../components/ng-zorro.module';
import { TUIModule } from '../../components/tui.module';
import { UIModule } from '../../components/ui.module';
import { DirectivesModule } from '../../directives/directives.module';

import { PipesModule } from '../../pipes/pipes.module';
import { LocationsDrawerDraftComponent } from './components/locations-drawer-draft/locations-drawer-draft.component';
import { LocationsPageComponent } from './locations.component';
import { LocationsConfirmDeleteModalComponent } from './components/locations-confirm-delete-modal/locations-confirm-delete-modal.component';
import { LocationsConfirmDisableModalComponent } from './components/locations-confirm-disable-modal/locations-confirm-disable-modal.component';

const components = [
  LocationsPageComponent,
  LocationsDrawerDraftComponent,
  LocationsConfirmDeleteModalComponent,
  LocationsConfirmDisableModalComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    UICommonModule,
    DirectivesModule,
    PipesModule,
    TUIModule,
    NgZorroModule,
  ],
  declarations: components,
  exports: components,
})
export class LocationsModule {}
