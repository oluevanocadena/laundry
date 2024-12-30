import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSegmentedModule } from 'ng-zorro-antd/segmented';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

let components = [
  NzAlertModule,
  NzButtonModule,
  NzMessageModule,
  NzSegmentedModule,
  NzDrawerModule,
];

@NgModule({
  imports: [CommonModule, ...components],
  exports: components,
})
export class NgZorroModule {}
