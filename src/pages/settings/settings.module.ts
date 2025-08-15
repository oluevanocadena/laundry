import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UICommonModule } from '../../components/common/common.module';
import { NgZorroModule } from '../../components/ng-zorro.module';
import { TUIModule } from '../../components/tui.module';
import { UIModule } from '../../components/ui.module';
import { DirectivesModule } from '../../directives/directives.module';
import { LoginModule } from '../session/login.module';
import { SettingsPageComponent } from './settings-page.component';

const components = [SettingsPageComponent];

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
  ],
  declarations: components,
  exports: components,
})
export class SettingsModule {}
