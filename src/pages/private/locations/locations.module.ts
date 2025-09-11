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

import { LocationsConfirmDeleteModalComponent } from '@pages/private/locations/components/locations-confirm-delete-modal/locations-confirm-delete-modal.component';
import { LocationsConfirmDisableModalComponent } from '@pages/private/locations/components/locations-confirm-disable-modal/locations-confirm-disable-modal.component';
import { LocationsDrawerDraftComponent } from '@pages/private/locations/components/locations-drawer-draft/locations-drawer-draft.component';
import { LocationsPageComponent } from '@pages/private/locations/locations.component';

const components = [
  LocationsConfirmDeleteModalComponent,
  LocationsConfirmDisableModalComponent,
  LocationsDrawerDraftComponent,
  LocationsPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    UIAtomsModule,
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
