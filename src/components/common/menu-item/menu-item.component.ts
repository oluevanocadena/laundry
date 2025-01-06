import {
	Component,
	ContentChildren,
	Input,
	QueryList
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'menu-item',
  standalone: false,
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss'],
})
export class MenuItemComponent {
  @Input() icon?: string;
  @Input() label?: string;
  @Input() urlBase?: string;
  @Input() link?: string;
  @Input() isGroup: boolean = false;
  @Input() bold: boolean = false;
  @Input() collapsed: boolean = false;

  private _level: number = 0;
  @Input() set level(value: number) {
    if (value > 0 && this.level !== value) {
      this._level = value;
    }
    this.levelPadding = this.calculatePadding();
  }
  get level(): number {
    return this._level;
  }

  @ContentChildren(MenuItemComponent)
  content!: QueryList<MenuItemComponent>;
  private _hasContent = false;
  public levelPadding = '0.25rem 0rem';

  constructor(public activatedRoute: ActivatedRoute) {}

  /**
   * UI Methods
   */

  calculatePadding() {
    let levelRem = this.level > 0 ? 1.5 : 0.75;
    for (let i = 0; i < this.level; i++) {
      levelRem += 0.75;
    }
    return `0.25rem 0.75rem 0.25rem ${levelRem}rem`;
  }

  /**
   * Getters
   */

  get isOpen() {
    return location.pathname.includes(this.urlBase ?? '');
  }

  get hasNgContent() {
    return this._hasContent || this.content.length > 0;
  }

  /**
   * Lifecycle Hook
   */
  ngAfterContentInit(): void {
    this._hasContent = this.content.length > 0;
    this.levelPadding = this.calculatePadding();
  }
}
