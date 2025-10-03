import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';
import { DirectivesModule } from '@directives/directives.module';

import { SettingsPageComponent } from '@pages/private/settings/pages/general/settings-page.component';

import { SettingsMenuComponent } from '@pages/private/settings/pages/components/settings-menu/settings-menu.component';
import { SettingsBillingHistoryComponent } from '@private/settings/pages/billing/components/billing-history/settings-billing-history.component';
import { SettingsBillingPageComponent } from '@private/settings/pages/billing/settings-billing-page.component';
import { SettingsBackupComponent } from '@private/settings/pages/general/components/backup/settings-backup.component';
import { SettingsDeactivateComponent } from '@private/settings/pages/general/components/deactivate/settings-deactivate.component';
import { SettingsGeneralsComponent } from '@private/settings/pages/general/components/generals/settings-generals.component';
import { SettingsPointOfSaleGeneralComponent } from '@private/settings/pages/point-of-sale/components/point-of-sale-general/settings-point-of-sale-general.component';
import { SettingsPointOfSalePageComponent } from '@private/settings/pages/point-of-sale/settings-point-of-sale-page.component';
import { SettingsSubsctiptionPlanGeneralComponent } from '@private/settings/pages/subsctiption-plan/components/subsctiption-plan-general/settings-subsctiption-plan-general.component';
import { SettingsSubsctiptionPlanPageComponent } from '@private/settings/pages/subsctiption-plan/settings-subsctiption-plan-page.component';

const components = [
  SettingsBackupComponent,
  SettingsBillingHistoryComponent,
  SettingsBillingPageComponent,
  SettingsDeactivateComponent,
  SettingsGeneralsComponent,
  SettingsMenuComponent,
  SettingsPageComponent,
  SettingsPointOfSaleGeneralComponent,
  SettingsPointOfSalePageComponent,
  SettingsSubsctiptionPlanGeneralComponent,
  SettingsSubsctiptionPlanPageComponent,
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
export class SettingsModule {}
