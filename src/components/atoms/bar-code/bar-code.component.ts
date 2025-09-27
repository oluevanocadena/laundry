import { AfterViewInit, Component, Input, ViewChild, ElementRef } from '@angular/core';
import JsBarcode from 'jsbarcode';

@Component({
  selector: 'bar-code',
  standalone: false,
  templateUrl: './bar-code.component.html',
  styleUrls: ['./bar-code.component.scss'],
})
export class BarCodeComponent implements AfterViewInit {
  @Input() value: string = '123456789';
  @Input() format: string = 'CODE128';
  @Input() widthLine: number = 2;
  @Input() heightLine: number = 50;
  @Input() displayValue: boolean = true;

  @ViewChild('barcode') barcode!: ElementRef<SVGSVGElement>;

  ngAfterViewInit() {
    JsBarcode(this.barcode.nativeElement, this.value, {
      format: this.format,
      width: this.widthLine,
      height: this.heightLine,
      displayValue: this.displayValue,
    });
  }
}
