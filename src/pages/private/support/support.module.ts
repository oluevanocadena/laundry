import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UIAtomsModule } from '@components/atoms/ui.atoms.module';
import { UICommonModule } from '@components/common/common.module';
import { NgZorroModule } from '@components/ng-zorro.module';
import { TUIModule } from '@components/tui.module';
import { UIModule } from '@components/ui.module';
import { DirectivesModule } from '@directives/directives.module';

import { SupportCommentsComponent } from '@pages/private/support/components/comments/support-comments.component';
import { SupportGeneralsComponent } from '@pages/private/support/components/generals/support-generals.component';
import { SupportHeaderComponent } from '@pages/private/support/components/header/support-header.component';
import { SupportMediaComponent } from '@pages/private/support/components/media/support-media.component';
import { PipesModule } from '@pipes/pipes.module';
import { SupportDraftPageComponent } from '@private/support/draft/support-draft-page.component';
import { SupportPageComponent } from '@private/support/support.component';

const components = [
  SupportPageComponent,
  SupportDraftPageComponent,
  SupportHeaderComponent,
  SupportGeneralsComponent,
  SupportMediaComponent,
  SupportCommentsComponent,
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UIModule,
    UIAtomsModule,
    UICommonModule,
    DirectivesModule,
    PipesModule,
    TUIModule,
    NgZorroModule,
  ],
  declarations: components,
  exports: components,
})
export class SupportModule {}
