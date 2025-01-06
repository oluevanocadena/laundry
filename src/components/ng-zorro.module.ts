import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

let MODULES = [
  NzAlertModule,
  NzButtonModule,
  NzDrawerModule,
  NzDropDownModule,
  NzMenuModule,
  NzModalModule,
  NzSegmentedModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [],
})
export class NgZorroModule {}
