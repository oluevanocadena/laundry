import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { OrdersService } from './orders.service';
import { CustomersService } from './customers.service';

const components = [OrdersService, CustomersService];

@NgModule({
  imports: [CommonModule],
  providers: components,
})
export class ServicesModule {}
