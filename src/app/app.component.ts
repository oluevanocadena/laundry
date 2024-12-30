import { TuiRoot } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIModule } from '../components/ui.module';
import { PagesModule } from '../pages/pages.module';
import { DirectivesModule } from '../directives/directives.module';
import { UICommonModule } from '../components/common/common.modulte';
import { TUIModule } from '../components/tui.module';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    UIModule,
    PagesModule,
    UICommonModule,
    DirectivesModule,
    TUIModule,
      TuiRoot
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portal';
}
