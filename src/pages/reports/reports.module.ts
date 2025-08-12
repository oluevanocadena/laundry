import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UICommonModule } from '../../components/common/common.module';
import { NgZorroModule } from '../../components/ng-zorro.module';
import { TUIModule } from '../../components/tui.module';
import { UIModule } from '../../components/ui.module';
import { DirectivesModule } from '../../directives/directives.module';

import { ReportsPageComponent } from './reports.component';

const components = [ReportsPageComponent];

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
  ],
  declarations: components,
  exports: components,
})
export class ReportsModule {}
