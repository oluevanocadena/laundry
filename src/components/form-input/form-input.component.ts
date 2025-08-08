import {
  Component,
  EventEmitter,
  Input,
  Output,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { TuiDay, TuiTime } from '@taiga-ui/cdk';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
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
    | 'date-range'
    | 'time'
    | 'search'
    | 'number' = 'text';
  @Input() countryCode: string = '+52';
  @Input() outerLabel: boolean = true;
  @Input() size: TuiSizeL | TuiSizeS = 's';
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() postFix: string = '';
  @Input() timeItems: TuiTime[] = [];
  @Input() minDate: TuiDay | null = TuiDay.currentLocal().append({ day: 1 });
  @Input() debounce: number = 300;
  @Input() required: boolean = false;
  //Outputs
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  value: string = '';
  private _disabled = false;
  @Input() set disabled(value: boolean) {
    this._disabled = value;
    if (value) {
      this.formGroup.controls.value.disable();
    }
  }
  get disabled() {
    return this._disabled;
  }

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  private onChange = (value: string) => {};
  private onTouched = () => {};

  formGroup = new FormGroup({
    value: new FormControl(''),
  });

  constructor() {}

  setupSearchDebounce(): void {
    this.searchSubject
      .pipe(
        debounceTime(this.debounce),
        distinctUntilChanged(),
        takeUntil(this.destroy$)
      )
      .subscribe((value) => {
        this.onSearch.emit(value);
      });
  }

  writeValue(value: string): void {
    this.value = value;
    console.log('value', value);
    this.formGroup.controls.value.setValue(value);
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
    if (this.type === 'search') {
      this.searchSubject.next(value);
    }
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

  /**
   * lifecycle
   */

  ngOnInit() {
    if (this.type === 'search') {
      this.setupSearchDebounce();
    }
  }

  ngOnDestroy() {
    this.destroy$?.next();
    this.destroy$?.complete();
  }
}
