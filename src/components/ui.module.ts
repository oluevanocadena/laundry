import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { StyleDirective } from '@directives/directives';
import { DirectivesModule } from '@directives/directives.module';

const components: any[] = [];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, TUIModule, NgZorroModule, DirectivesModule, UIAtomsModule],
  declarations: components,
  exports: components,
  providers: [StyleDirective],
})
export class UIModule {}
