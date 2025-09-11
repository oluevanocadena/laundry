import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIModule } from '../components/ui.module';
import { ShowLoaderDirective, StyleDirective, IfColumnDirective } from './directives';

const directives = [StyleDirective, ShowLoaderDirective, IfColumnDirective];

@NgModule({
  imports: [CommonModule],
  declarations: directives,
  exports: directives,
})
export class DirectivesModule {}
