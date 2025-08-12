import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SettingsPageComponent } from './settings-page.component';
import { UIModule } from '../../components/ui.module';
import { UICommonModule } from '../../components/common/common.module';
import { DirectivesModule } from '../../directives/directives.module';
import { TUIModule } from '../../components/tui.module';
import { NgZorroModule } from '../../components/ng-zorro.module';
import { LoginModule } from '../session/login.module';
import { BoardModule } from '../board/board.module';

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
    BoardModule,
  ],
  declarations: components,
  exports: components,
})
export class SettingsModule {}
