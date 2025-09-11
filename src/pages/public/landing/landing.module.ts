import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { UIPublicModule } from '@components/public/public.modulte';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';

import { DirectivesModule } from '@directives/directives.module';
import { LandingComponent } from '@pages/public/landing/landing.component';

const components = [LandingComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    UIAtomsModule,
    UICommonModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,
    UIPublicModule,
  ],
  declarations: components,
  exports: components,
})
export class LandingModule {}
