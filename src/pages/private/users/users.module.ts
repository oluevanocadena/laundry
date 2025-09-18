import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule } from '@angular/router';
import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';
import { DirectivesModule } from '@directives/directives.module';
import { PipesModule } from '@pipes/pipes.module';

import { UsersGeneralsComponent } from '@private/users/components/generals/users-generals.component';
import { UsersHeaderComponent } from '@private/users/components/header/users-header.component';
import { UsersPermissionsComponent } from '@private/users/components/permissions/users-permissions.component';
import { UsersDraftComponent } from '@private/users/draft/users-draft.component';
import { UsersPageComponent } from '@private/users/users.component';
import { UsersAddressComponent } from './components/address/users-address.component';

const components = [
  UsersPageComponent,
  UsersDraftComponent,
  UsersHeaderComponent,
  UsersGeneralsComponent,
  UsersAddressComponent,
  UsersPermissionsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    UIModule,
    UIAtomsModule,
    UICommonModule,
    PipesModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,
  ],
  declarations: components,
  exports: components,
})
export class UsersModule {}
