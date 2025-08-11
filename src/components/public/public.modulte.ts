import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { NgZorroModule } from '../ng-zorro.module';
import { TUIModule } from '../tui.module';
import { UIModule } from '../ui.module';
import { HeaderComponent } from './header/header.component';
import { UICommonModule } from '../common/common.modulte';
import { PublicFooterComponent } from './footer/footer.component';

const components = [HeaderComponent, PublicFooterComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    UIModule,
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
