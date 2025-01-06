import { TuiRoot } from '@taiga-ui/core';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UIModule } from '../components/ui.module';
import { PagesModule } from '../pages/pages.module';
import { DirectivesModule } from '../directives/directives.module';
import { UICommonModule } from '../components/common/common.modulte';
import { TUIModule } from '../components/tui.module';
import { NgZorroModule } from '../components/ng-zorro.module';
import { TuiLanguageSwitcherService } from '@taiga-ui/i18n/utils';
import { FormControl } from '@angular/forms';
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
