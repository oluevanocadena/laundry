import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StyleDirective } from '@directives/directives';
import { DirectivesModule } from '@directives/directives.module';

import { BarCodeComponent } from '@components/atoms/bar-code/bar-code.component';
import { DropdownComponent } from '@components/atoms/dropdown/dropdown.component';
import { FormInputComponent } from '@components/atoms/form-input/form-input.component';
import { GridComponent } from '@components/atoms/grid/grid.component';
import { InputDateDropdownComponent } from '@components/atoms/input-date-dropdown/input-date-dropdown.component';
import { LogoComponent } from '@components/atoms/logo/logo.component';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { LineChartComponent } from './line-chart/line-chart.component';

const components = [
  GridComponent,
  FormInputComponent,
  InputDateDropdownComponent,
  DropdownComponent,
  BarCodeComponent,
  LogoComponent,
  LineChartComponent,
];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TUIModule, NgZorroModule, DirectivesModule],
  providers: [StyleDirective],
})
export class UIAtomsModule {}
