import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzModalModule } from 'ng-zorro-antd/modal';

let MODULES = [
  NzAlertModule,
  NzButtonModule,
  NzSegmentedModule,
  NzDrawerModule,
  NzModalModule,
];

@NgModule({
  imports: MODULES,
  exports: MODULES,
  providers: [],
})
export class NgZorroModule {}
