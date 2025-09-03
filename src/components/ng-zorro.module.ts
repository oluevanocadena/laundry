import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

let MODULES = [
  NzAlertModule,
  NzAvatarModule,
  NzButtonModule,
  NzCheckboxModule,
  NzDrawerModule,
  NzDropDownModule,
  NzFormModule,
  NzMenuModule,
  NzModalModule,
  NzRadioModule,
  NzSegmentedModule,
  NzSelectModule, 
  NzSwitchModule,
  NzToolTipModule, 
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [],
})
export class NgZorroModule {}
