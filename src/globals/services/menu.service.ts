import { Injectable } from '@angular/core';
import { StorageProp } from '@globals/types/storage.type';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  collapsed = new StorageProp<boolean>(false, 'MENU_COLLAPSED');

  constructor() {}

  toggleMenu() {
    console.log('toggleMenu', this.collapsed.value);
    this.collapsed.value = !this.collapsed.value;
  }
}
