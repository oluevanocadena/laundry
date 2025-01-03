import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '../../directives/directives.module';
import { PipesModule } from '../../pipes/pipes.module';
import { NgZorroModule } from '../ng-zorro.module';
import { TUIModule } from '../tui.module';
import { UIModule } from '../ui.module';
import { DrawerMenuComponent } from './drawer-menu/drawer-menu.component';
import { DrawerNoticationsComponent } from './drawer-notications/drawer-notications.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LogoComponent } from './logo/logo.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { TopBarButtonsComponent } from './top-bar-buttons/top-bar-buttons.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const components = [
  DrawerMenuComponent,
  DrawerNoticationsComponent,
  FooterComponent,
  HeaderComponent,
  LogoComponent,
  ProfileMenuComponent,
  TopBarButtonsComponent,
  TopBarComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    UIModule,
    TUIModule,
    NgZorroModule,
    DirectivesModule,
    PipesModule,
  ],
  declarations: components,
  exports: components,
})
export class UICommonModule {}
