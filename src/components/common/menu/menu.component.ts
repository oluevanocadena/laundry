import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NzMenuDirective } from 'ng-zorro-antd/menu';

@Component({
	selector: 'menu',
	standalone: false,
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
	private _collapsed: boolean = false;
	@Input() set collapsed(value: boolean) {
		this._collapsed = value;
		this.menu.updateInlineCollapse();
	}

	@ViewChild(NzMenuDirective, { static: true }) menu!: NzMenuDirective;

	constructor() {}

	ngOnInit() {}
}
