import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCommentModule } from 'ng-zorro-antd/comment';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

let MODULES = [
  NzAlertModule,
  NzAvatarModule,
  NzBadgeModule,
  NzButtonModule,
  NzCheckboxModule,
  NzCommentModule,
  NzDatePickerModule,
  NzDrawerModule,
  NzDropDownModule,
  NzFormModule,
  NzListModule,
  NzMenuModule,
  NzModalModule,
  NzRadioModule,
  NzSegmentedModule,
  NzSelectModule,
  NzSwitchModule,
  NzTabsModule,
  NzToolTipModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [],
})
export class NgZorroModule {}
