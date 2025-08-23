import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';
import { NgZorroModule } from '../ng-zorro.module';
import { TUIModule } from '../tui.module';
import { UIModule } from '../ui.module';
import { ButtonResponsiveComponent } from './button-responsive/button-responsive.component';
import { DrawerMenuComponent } from './drawer-menu/drawer-menu.component';
import { DrawerNotificationsComponent } from './drawer-notifications/drawer-notifications.component';
import { DrawerComponent } from './drawer/drawer.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { LayoutComponent } from './layout/layout.component';
import { LogoComponent } from './logo/logo.component';
import { MenuContentComponent } from './menu-content/menu-content.component';
import { MenuItemComponent } from './menu-item/menu-item.component';
import { MenuComponent } from './menu/menu.component';
import { ModalConfirmComponent } from './modal-confirm/modal-confirm.component';
import { ModalSearchComponent } from './modal-search/modal-search.component';
import { ModalSortComponent } from './modal-sort/modal-sort.component';
import { ModalTitleComponent } from './modal-title/modal-title.component';
import { ModalComponent } from './modal/modal.component';
import { ProfileMenuComponent } from './profile-menu/profile-menu.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { StatusBadgeComponent } from './status-badge/status-badge.component';
import { TableOptionsComponent } from './table-options/table-options.component';
import { TableSegmentsComponent } from './table-segments/table-segments.component';
import { TopBarButtonsComponent } from './top-bar-buttons/top-bar-buttons.component';
import { TopBarOrganizationComponent } from './top-bar-organization/top-bar-organization.component';
import { TopBarComponent } from './top-bar/top-bar.component';

const components = [
  ButtonResponsiveComponent,
  DrawerComponent,
  DrawerMenuComponent,
  DrawerNotificationsComponent,
  FooterComponent,
  HeaderComponent,
  ImageUploadComponent,
  LayoutComponent,
  LogoComponent,
  MenuComponent,
  MenuContentComponent,
  MenuItemComponent,
  ModalComponent,
  ModalConfirmComponent,
  ModalSearchComponent,
  ModalSortComponent,
  ModalTitleComponent,
  ProfileMenuComponent,
  SideMenuComponent,
  StatusBadgeComponent,
  TableOptionsComponent,
  TableSegmentsComponent,
  TopBarButtonsComponent,
  TopBarComponent,
  TopBarOrganizationComponent,  
];

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
  ],
  declarations: components,
  exports: components,
})
export class UICommonModule {}
