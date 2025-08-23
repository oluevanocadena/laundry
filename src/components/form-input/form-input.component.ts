import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
  forwardRef,
  inject,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import {
  TUI_IS_IOS,
  TuiDay,
  TuiIdentityMatcher,
  TuiStringHandler,
  TuiTime,
} from '@taiga-ui/cdk';
import { TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';

@Component({
  selector: 'form-input',
  standalone: false,
  templateUrl: './form-input.component.html',
  styleUrls: ['./form-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FormInputComponent),
      multi: true,
    },
  ],
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() clearable: boolean = true;
  @Input() countryCode: string = '+52';
  @Input() debounce: number = 300;
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
  @Input() timeItems: TuiTime[] = [];
  @Input() type: InputType = 'text';
  @Input() maxRows: number = 8;

  //Options
  private _options: UISelectOption[] | null = [];
  @Input() set options(options: UISelectOption[] | null) {
    this._options = options;
  }
  get options() {
    return this._options || [];
  }

  //Disabled
  private _disabled = false;
  @Input() set disabled(value: boolean) {
    this._disabled = value;
    if (value) {
      this.valueControl.disable();
    }
  }
  get disabled() {
    return this._disabled;
  }

  //Outputs
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  protected stringifyContent: TuiStringHandler<any> = (x) => {
    const id = x.$implicit;
    return this.options?.find((option) => option.id === id)?.Name ?? '';
  };
  protected stringify: TuiStringHandler<UISelectOption> = (x) => {
    return x.Name;
  };
  protected identityMatcher: TuiIdentityMatcher<UISelectOption> = (
    a: UISelectOption | string,
    b: UISelectOption | string
  ) => {
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

  private onChange = (value: string) => {};
  private onTouched = () => {};

  valueControl = new FormControl(null);

  //IOS
  protected readonly isIos = inject(TUI_IS_IOS);
  protected get pattern(): string | null {
    return this.isIos ? '+[0-9-]{1,20}' : null;
  }

  constructor(private injector: Injector) {}

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

  writeValue(value: any): void {}

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
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
    let ngControl = this.injector.get(NgControl, null);
    if (ngControl) {
      ngControl.valueAccessor = this;
      this.valueControl = ngControl.control as FormControl;
      this.valueControl.valueChanges
        ?.pipe(distinctUntilChanged(), takeUntil(this.destroy$))
        .subscribe((value: any) => {
          if (this.type === 'switch') {
            this.onChange(value);
          } else if (this.type === 'select') {
            if (
              value &&
              typeof value === 'object' &&
              this.valueControl.value !== value.id
            ) {
              this.onChange(value.id);
            }
          } else {
            this.onChange(value);
          }
        });
    }

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
  id: string;
  Name: string;
}

export type InputType =
  | 'text'
  | 'email'
  | 'phone'
  | 'password'
  | 'textarea'
  | 'date'
  | 'date-range'
  | 'time'
  | 'search'
  | 'switch'
  | 'select'
  | 'currency'
  | 'number'
  | 'decimal';

export type InputOrientation = 'horizontal' | 'vertical';
