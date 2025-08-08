import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIModule } from '../components/ui.module';
import { ShowLoaderDirective, StyleDirective } from './directives';

const directives = [StyleDirective, ShowLoaderDirective];

@NgModule({
  imports: [CommonModule, UIModule],
  declarations: directives,
  exports: directives,
})
export class DirectivesModule {}
