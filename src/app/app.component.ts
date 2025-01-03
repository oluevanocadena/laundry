import { TuiRoot } from '@taiga-ui/core';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIModule } from '../components/ui.module';
import { PagesModule } from '../pages/pages.module';
import { DirectivesModule } from '../directives/directives.module';
import { UICommonModule } from '../components/common/common.modulte';
import { TUIModule } from '../components/tui.module';
import { NgZorroModule } from '../components/ng-zorro.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    UIModule,
    PagesModule,
    UICommonModule,
    DirectivesModule,
    TUIModule,
    NgZorroModule,
    TuiRoot,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'portal';
}
