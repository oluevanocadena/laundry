import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';
import { DirectivesModule } from '@directives/directives.module';

import { StoreMenuComponent } from '@pages/private/store/components/store-menu/store-menu.component';
import { SettingsStoreDomainComponent } from '@pages/private/store/pages/store/components/store-domain/settings-store-domain.component';
import { SettingsStoreGeneralComponent } from '@pages/private/store/pages/store/components/store-general/settings-store-general.component';
import { SettingsStoreInventoryAndReturnsComponent } from '@pages/private/store/pages/store/components/store-inventory-and-returns/settings-store-inventory-and-returns.component';
import { SettingsStorePaymentsAndShippingComponent } from '@pages/private/store/pages/store/components/store-payments-and-shipping/settings-store-payments-and-shipping.component';
import { SettingsStorePersonalizationComponent } from '@pages/private/store/pages/store/components/store-personalization/settings-store-personalization.component';
import { SettingsStorePageComponent } from '@pages/private/store/pages/store/settings-store-page.component';

const components = [
  SettingsStorePageComponent,
  StoreMenuComponent,
  SettingsStoreGeneralComponent,
  SettingsStoreDomainComponent,
  SettingsStorePersonalizationComponent,
  SettingsStorePaymentsAndShippingComponent,
  SettingsStoreInventoryAndReturnsComponent,
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
    TUIModule,
    NgZorroModule,
  ],
  declarations: components,
  exports: components,
})
export class StoreModule {}
