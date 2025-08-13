import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormInputComponent } from './form-input/form-input.component';
import { GridComponent } from './grid/grid.component';
import { TUIModule } from './tui.module';
import { NgZorroModule } from "./ng-zorro.module";

const components = [GridComponent, FormInputComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    TUIModule,
    NgZorroModule
],
  declarations: components,
  exports: components,
})
export class UIModule {}
