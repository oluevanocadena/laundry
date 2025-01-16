import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Customer } from '../../../../services/customers.service';
import { Subscription } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'customers-notes',
  standalone: false,
  templateUrl: './customers-notes.component.html',
  styleUrls: ['./customers-notes.component.scss'],
})
export class CustomersNotesComponent extends HelperPage implements OnInit {
  @Input() edition: boolean = false;

  //Input
  private _order: Customer | null = null;
  @Input() set customer(value: Customer) {
    this._order = value;
  }
  get customer(): Customer | null {
    return this._order;
  }
  @Output() customerChange: EventEmitter<Customer> =
    new EventEmitter<Customer>();

  //Rxjs
  subscription: Subscription | null = null;

  //FormGroup
  formGroup = new FormGroup({
    notes: new FormControl(),
  });

  constructor() {
    super();
  }

  onInputNotes() {
    if (this.customer !== null) {
      this.customer.notes = this.notes;
    }
  }

  /**
   * Gettters
   */

  get notes() {
    return this.formGroup.get('notes')?.value ?? '';
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
