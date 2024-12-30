import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectivesModule } from '../../directives/directives.module';
import { UIModule } from '../ui.module';
import { HeaderComponent } from './header/header.component';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { TUIModule } from '../tui.module';
import { TuiDropdown } from '@taiga-ui/core';

const components = [HeaderComponent, FooterComponent];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UIModule,
    DirectivesModule,
    TUIModule,
  ],
  declarations: components,
  exports: components,
})
export class UICommonModule {}
