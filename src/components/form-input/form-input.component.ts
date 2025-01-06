import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { tuiCreateTimePeriods } from '@taiga-ui/kit';
@Component({
  selector: 'form-input',
  standalone: false,
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() label: string | undefined = undefined;
  @Input() placeholder: string = 'Enter value';
  @Input() type:
    | 'text'
    | 'email'
    | 'phone'
    | 'password'
    | 'textarea'
    | 'date'
    | 'time'
    | 'number' = 'text';
  @Input() countryCode: string = '+52';
  @Input() outerLabel: boolean = true;
  @Input() size: TuiSizeL | TuiSizeS = 'm';
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() postFix: string = '';
  @Input() timeItems: TuiTime[] = [];
  @Input() minDate: TuiDay | null = TuiDay.currentLocal().append({ day: 1 });

  value: string = '';
  disabled = false;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  writeValue(value: string): void {
    this.value = value || '';
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: Event): void {
    let value = (event.target as any)?.value;
    this.value = value;
    this.onChange(value);
  }

  onNgModelChange(value: any): void {
    this.value = value;
    this.onChange(value);
  }

  /**
   * Getters
   */

  get isEmailOrText() {
    return this.type === 'email' || this.type === 'text';
  }
}
