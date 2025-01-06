import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
let MODULES = [
  NzAlertModule,
  NzButtonModule,
  NzSegmentedModule,
  NzDrawerModule,
  NzModalModule,
  NzMenuModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [],
})
export class NgZorroModule {}
