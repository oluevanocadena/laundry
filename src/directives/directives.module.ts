import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { UIModule } from '../components/ui.module';
import { StyleDirective } from './directives';

const directives = [StyleDirective];

@NgModule({
  imports: [CommonModule, UIModule],
  declarations: directives,
  exports: directives,
})
export class DirectivesModule {}
