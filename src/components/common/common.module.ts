import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';

import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { ButtonResponsiveComponent } from '@components/common/button-responsive/button-responsive.component';
import { DrawerMenuComponent } from '@components/common/drawer-menu/drawer-menu.component';
import { DrawerNotificationsComponent } from '@components/common/drawer-notifications/drawer-notifications.component';
import { DrawerComponent } from '@components/common/drawer/drawer.component';
import { FooterComponent } from '@components/common/footer/footer.component';
import { HeaderComponent } from '@components/common/header/header.component';
import { ImageUploadComponent } from '@components/common/image-upload/image-upload.component';
import { LayoutComponent } from '@components/common/layout/layout.component';
import { LogoComponent } from '@components/common/logo/logo.component';
import { MenuContentComponent } from '@components/common/menu-content/menu-content.component';
import { MenuItemComponent } from '@components/common/menu-item/menu-item.component';
import { MenuComponent } from '@components/common/menu/menu.component';
import { ModalColumnsSortComponent } from '@components/common/modal-columns-sort/modal-columns-sort.component';
import { ModalColumnsTableComponent } from '@components/common/modal-columns-table/modal-columns-table.component';
import { ModalConfirmComponent } from '@components/common/modal-confirm/modal-confirm.component';
import { ModalSearchComponent } from '@components/common/modal-search/modal-search.component';
import { ModalSortComponent } from '@components/common/modal-sort/modal-sort.component';
import { ModalTitleComponent } from '@components/common/modal-title/modal-title.component';
import { ModalComponent } from '@components/common/modal/modal.component';
import { ProfileMenuComponent } from '@components/common/profile-menu/profile-menu.component';
import { SideMenuComponent } from '@components/common/side-menu/side-menu.component';
import { StatusBadgeComponent } from '@components/common/status-badge/status-badge.component';
import { TableFiltersComponent } from '@components/common/table-filters/table-filters.component';
import { TablePaginationComponent } from '@components/common/table-pagination/table-pagination.component';
import { TopBarButtonsComponent } from '@components/common/top-bar-buttons/top-bar-buttons.component';
import { TopBarOrganizationComponent } from '@components/common/top-bar-organization/top-bar-organization.component';
import { TopBarComponent } from '@components/common/top-bar/top-bar.component';

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
  ModalColumnsTableComponent,
  ModalColumnsSortComponent,
  ModalComponent,
  ModalConfirmComponent,
  ModalSearchComponent,
  ModalSortComponent,
  ModalTitleComponent,
  ProfileMenuComponent,
  SideMenuComponent,
  StatusBadgeComponent,
  TableFiltersComponent,
  TablePaginationComponent,
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
    UIAtomsModule,
    TUIModule,
    NgZorroModule,
    DirectivesModule,
    PipesModule,
  ],
  declarations: components,
  exports: components,
})
export class UICommonModule {}
