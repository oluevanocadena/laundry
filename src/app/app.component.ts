import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TuiRoot } from '@taiga-ui/core';
import { UICommonModule } from '../components/common/common.modulte';
import { NgZorroModule } from '../components/ng-zorro.module';
import { TUIModule } from '../components/tui.module';
import { UIModule } from '../components/ui.module';
import { DirectivesModule } from '../directives/directives.module';
import { PagesModule } from '../pages/pages.module';
import { SettingsService } from '../services/settings.services';
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
  // protected readonly switcher = inject(TuiLanguageSwitcherService);
  constructor(public settingsService: SettingsService) {
    this.settingsService.initSettings('a').subscribe();
    // this.language.setValue('spanish');
    // this.switcher.setLanguage('spanish');
  }
}
