import { Component, Input, OnInit } from '@angular/core';
import { HelperPage } from '../helper.page';
import { TuiAppearanceOptions } from '@taiga-ui/core';

@Component({
  selector: 'button-responsive',
  standalone: false,
  templateUrl: './button-responsive.component.html',
  styleUrls: ['./button-responsive.component.scss'],
})
export class ButtonResponsiveComponent extends HelperPage implements OnInit {
  @Input() loading: boolean = false;
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() size: "m" | "l" | "xl" | "s" | "xs" = "m";
  @Input() label: string = '';
  @Input() appearance: TuiAppearanceOptions['appearance'] = 'outline';

  constructor() {
    super();
  }

  /**
   * UI Events
   */

  onClick() {}

  /**
   * Life Cycles
   */
  ngOnInit() {}
}
