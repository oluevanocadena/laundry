import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { IfColumnDirective, ShowLoaderDirective, StyleDirective } from '@directives/directives';
import { RoleShowDirective } from '@directives/roles.directive';

const directives = [StyleDirective, ShowLoaderDirective, IfColumnDirective, RoleShowDirective];

@NgModule({
  imports: [CommonModule],
  declarations: directives,
  exports: directives,
})
export class DirectivesModule {}
