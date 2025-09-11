import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';

import { PublicFooterComponent } from '@components/public/footer/footer.component';
import { HeaderComponent } from '@components/public/header/header.component';

const components = [HeaderComponent, PublicFooterComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
    UIAtomsModule,
    TUIModule,
    NgZorroModule,
    DirectivesModule,
    PipesModule,
    UICommonModule,
  ],
  declarations: components,
  exports: components,
})
export class UIPublicModule {}
