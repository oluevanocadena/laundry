import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperPage } from '../../../../components/common/helper.page';

@Component({
  selector: 'orders-notes',
  standalone: false,
  templateUrl: './orders-notes.component.html',
  styleUrls: ['./orders-notes.component.scss'],
})
export class OrdersNotesComponent extends HelperPage implements OnInit {

  //Input
  @Input() edition: boolean = false;

  //FormGroup
  formGroup = new FormGroup({
    notes: new FormControl(),
  });

  constructor() {
    super();
  }

  /**
   * Life cycle method
   */
  ngOnInit() {}
}
