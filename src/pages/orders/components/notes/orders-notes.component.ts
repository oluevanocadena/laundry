import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperPage } from '../../../../components/common/helper.page';
import { Order } from '../../../../services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'orders-notes',
  standalone: false,
  templateUrl: './orders-notes.component.html',
  styleUrls: ['./orders-notes.component.scss'],
})
export class OrdersNotesComponent extends HelperPage implements OnInit {
  //Input
  @Input() edition: boolean = false;

  //Order
  private _order: Order | null = null;
  @Input() set order(value: Order) {
    this._order = value;
    this.formGroup.patchValue(
      {
        notes: value.notes ?? '',
      },
      { emitEvent: false }
    );
  }
  get order(): Order | null {
    return this._order;
  }
  @Output() orderChange: EventEmitter<Order> = new EventEmitter<Order>();

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
    if (this.order !== null) {
      this.order.notes = this.notes;
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
