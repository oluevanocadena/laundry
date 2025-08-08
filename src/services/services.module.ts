import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OrdersService } from './orders.service';

const components = [OrdersService];

@NgModule({
  imports: [CommonModule],
  providers: components,
})
export class ServicesModule {}
