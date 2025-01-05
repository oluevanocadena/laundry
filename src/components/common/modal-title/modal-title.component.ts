import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal-title',
  standalone: false,
  templateUrl: './modal-title.component.html',
  styleUrls: ['./modal-title.component.scss'],
})
export class ModalTitleComponent implements OnInit {
  @Input() title: string = '';
  @Input() subtitle?: string = undefined;
  @Output() onClose: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}

  close() {
    this.onClose.emit();
  }

  ngOnInit() {}
}
