import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '@components/common/helper.page';

@Component({
  selector: 'dropdown',
  standalone: false,
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent extends HelperPage {
  @Input() closeOnBackdrop = true; // 🔑 bandera para controlar el cierre al dar click fuera
  @Output() accept = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  visible = false;

  toggle() {
    this.visible = !this.visible;
  }

  close() {
    this.visible = false;
  }

  onAccept() {
    this.accept.emit();
    this.close();
  }

  onCancel() {
    this.cancel.emit();
    this.close();
  }

  // Detectar click fuera
  @HostListener('document:mousedown', ['$event'])
  onClickOutside(event: MouseEvent) {
    if (!this.visible) return;

    const target = event.target as HTMLElement;
    const clickedInside = !!target.closest('.custom-dropdown');

    if (!clickedInside && this.closeOnBackdrop) {
      this.close();
    }
  }


}
