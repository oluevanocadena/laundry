import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GridComponent } from './grid/grid.component';
import { FormInputComponent } from './form-input/form-input.component';
import { TUIModule } from './tui.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const components = [GridComponent, FormInputComponent];

@NgModule({
  imports: [CommonModule, TUIModule, FormsModule, ReactiveFormsModule],
  declarations: components,
  exports: components,
})
export class UIModule {}
