import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DropdownComponent } from '@components/atoms/dropdown/dropdown.component';
import { FormInputComponent } from '@components/atoms/form-input/form-input.component';
import { GridComponent } from '@components/atoms/grid/grid.component';
import { InputDateDropdownComponent } from '@components/atoms/input-date-dropdown/input-date-dropdown.component';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { StyleDirective } from '@directives/directives';
import { DirectivesModule } from '@directives/directives.module';

const components = [GridComponent, FormInputComponent, InputDateDropdownComponent, DropdownComponent];

@NgModule({
  declarations: components,
  exports: components,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TUIModule, NgZorroModule, DirectivesModule],
  providers: [StyleDirective],
})
export class UIAtomsModule {}
