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

import { LoginPageComponent } from '@pages/private/session/login/login-page.component';
import { RegisterConfirmComponent } from '@pages/private/session/register-confirm/register-confirm.component';
import { RegisterPageComponent } from '@pages/private/session/register/register-page.component';

const components = [LoginPageComponent, RegisterPageComponent, RegisterConfirmComponent];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    UIModule,
    UIAtomsModule,
    UICommonModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,
  ],
  declarations: components,
  exports: components,
})
export class LoginModule {}
