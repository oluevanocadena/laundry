import { Component, OnInit } from '@angular/core';
import { HelperPage } from '../../../components/common/helper.page';
import {
  Customer,
  CustomerEmpty,
  CustomersService,
} from '../../../services/customers.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import {
  CustomerMarketingStatus,
  CustomersStatusService,
  CustomerStatus,
} from '../../../services/customers-status.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-customers-draft',
  standalone: false,
  templateUrl: './customers-draft.component.html',
  styleUrls: ['./customers-draft.component.scss'],
})
export class CustomersDraftComponent extends HelperPage implements OnInit {
  //Flag Management
  loading: boolean = false;

  //Models
  customer: Customer = CustomerEmpty;

  //Arrays
  customerStatuses: CustomerStatus[] = [];
  customerMarketingStatuses: CustomerMarketingStatus[] = [];

  constructor(
    public nzMessageService: NzMessageService,
    public customersService: CustomersService,
    public customerStatusService: CustomersStatusService
  ) {
    super();
  }

  /**
   * APi Calls
   */
  async load() {
    try {
      this.loading = true;
      this.customerStatuses = await firstValueFrom(
        this.customerStatusService.getFakeCustomerStatuses()
      );
      this.customerMarketingStatuses = await firstValueFrom(
        this.customerStatusService.getFakeCustomerMarketingStatuses()
      );
      // Set status name's
      if (this.customer !== null) {
        this.customer.status =
          this.customerStatuses.find((x) => x.id === this.customer.statusId)
            ?.name ?? '';
        this.customer.statusMarketing =
          this.customerMarketingStatuses.find(
            (x) => x.id === this.customer.statusMarketingId
          )?.name ?? '';
      }
    } catch (error) {
      console.error(error);
      this.nzMessageService.error('Error loading data');
    } finally {
      this.loading = false;
    }
  }

  /**
   * Life Cycle
   */
  ngOnInit() {
    this.load();
  }
}
