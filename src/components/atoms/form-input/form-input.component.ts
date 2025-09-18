import { Component, EventEmitter, Input, Output, ViewChild, forwardRef, inject } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { InputDateDropdownComponent } from '@components/atoms/input-date-dropdown/input-date-dropdown.component';
import { type MaskitoTimeMode } from '@maskito/kit';
import { TUI_IS_IOS, TuiBooleanHandler, TuiDay, TuiIdentityMatcher, TuiStringHandler } from '@taiga-ui/cdk';
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
  @ViewChild(InputDateDropdownComponent, { static: false }) dateDropdown!: InputDateDropdownComponent;

  @Input() clearable: boolean = true;
  @Input() countryCode: string = '+52';
  @Input() debounce: number = 500;
  @Input() label: string | undefined = undefined;
  @Input() max: number = 100;
  @Input() min: number = 0;
  @Input() step: number = 1;
  @Input() minDate: TuiDay | null = TuiDay.currentLocal().append({ day: 1 });
  @Input() orientation: InputOrientation = 'vertical';
  @Input() outerLabel: boolean = true;
  @Input() placeholder: string = 'Enter value';
  @Input() postFix: string = '';
  @Input() required: boolean = false;
  @Input() size: TuiSizeL | TuiSizeS = 's';
  @Input() type: InputType = 'text';
  @Input() maxRows: number = 6;
  @Input() prefixIcon: string = 'hash';
  @Input() timeMask: MaskitoTimeMode = 'HH:MM';

  //Options
  private _options: (UISelectOption | any)[] | null = [];
  @Input() set options(options: (UISelectOption | any)[] | null) {
    this._options = options;
  }
  get options() {
    return this._options || [];
  }

  //Outputs
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  protected stringifyContent: TuiStringHandler<any> = (x) => {
    let id: string | number;
    if (typeof x.$implicit === 'string' || typeof x.$implicit === 'number') {
      id = x.$implicit;
    } else if (typeof x.$implicit === 'object' && x.$implicit !== null) {
      id = x.$implicit.id;
    } else {
      id = '';
    }
    return this.options?.find((option) => option.id.toString() === id.toString())?.Name ?? '';
  };
  protected stringify: TuiStringHandler<UISelectOption> = (x) => {
    return x.Name;
  };
  protected identityMatcher: TuiIdentityMatcher<UISelectOption> = (a: UISelectOption | string, b: UISelectOption | string) => {
    let result = false;
    if (typeof a === 'string' && typeof b === 'object') {
      result = a === b.id;
    } else if (typeof a === 'object' && typeof b === 'string') {
      result = a.id === b;
    } else if (typeof a === 'string' && typeof b === 'string') {
      result = a === b;
    } else if (typeof a === 'object' && typeof b === 'object') {
      result = a.id === b.id;
    }
    return result;
  };

  protected disabledItemHandler: TuiBooleanHandler<UISelectOption> = (item) => {
    return item?.Disabled ?? false;
  };

  private onChange: (_: any) => void = () => {};
  private onTouched: () => void = () => {};

  valueControl = new FormControl(null);

  //IOS
  protected readonly isIos = inject(TUI_IS_IOS);
  protected get pattern(): string | null {
    return this.isIos ? '+[0-9-]{1,20}' : null;
  }

  isDisabled = false;

  constructor() {}

  setupSearchDebounce(): void {
    this.searchSubject
      .pipe(debounceTime(this.debounce), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((value) => {
        this.onSearch.emit(value);
      });
  }

  writeValue(value: any): void {
    this.valueControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
    if (isDisabled) {
      this.valueControl.disable({ emitEvent: false });
    } else {
      this.valueControl.enable({ emitEvent: false });
    }
  }

  onInputSearch(value: any): void {
    const text = value?.value ?? '';
    this.searchSubject.next(text);
  }

  /**
   * Getters
   */

  get hadError() {
    return this.valueControl.invalid && this.valueControl.touched;
  }

  /**
   * lifecycle
   */

  ngAfterContentInit() {
    this.valueControl.valueChanges?.pipe(distinctUntilChanged(), takeUntil(this.destroy$)).subscribe((value: any) => {
      if (this.type === 'switch') {
        this.onChange(value);
      } else if (this.type === 'select') {
        const valueSelect = typeof value === 'string' ? value : value.id;
        console.log('👉🏽 valueSelect', valueSelect);
        this.onChange(valueSelect);
      } else {
        this.onChange(value);
      }
      this.onTouched();
    });

    if (this.type === 'search') {
      this.setupSearchDebounce();
    }
  }

  ngOnDestroy() {
    this.destroy$?.next();
    this.destroy$?.complete();
  }
}

export interface UISelectOption {
  id: string | number;
  Name: string;
  Disabled?: boolean;
}

export type InputType =
  | 'text'
  | 'checkbox'
  | 'email'
  | 'phone'
  | 'password'
  | 'textarea'
  | 'date'
  | 'date-range'
  | 'date-range-dropdown'
  | 'time'
  | 'search'
  | 'switch'
  | 'select'
  | 'currency'
  | 'number'
  | 'decimal';

export type InputOrientation = 'horizontal' | 'vertical';
