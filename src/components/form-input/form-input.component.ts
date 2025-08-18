import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Injector,
  Input,
  Output,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { TUI_IS_IOS, TuiDay, TuiStringHandler, TuiTime } from '@taiga-ui/cdk';
import { TuiSizeL, TuiSizeS, tuiItemsHandlersProvider } from '@taiga-ui/core';
import { FormProp } from '@type/form.type';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  merge,
  startWith,
  takeUntil,
} from 'rxjs';

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
    tuiItemsHandlersProvider({
      stringify: signal((x: UISelectOption) => x.Name),
      identityMatcher: signal(
        (a: UISelectOption, b: UISelectOption) => a.id === b.id
      ),
    }),
  ],
})
export class FormInputComponent implements ControlValueAccessor {
  @Input() clearable: boolean = true;
  @Input() countryCode: string = '+52';
  @Input() debounce: number = 300;
  @Input() label: string | undefined = undefined;
  @Input() max: number = 100;
  @Input() min: number = 0;
  @Input() minDate: TuiDay | null = TuiDay.currentLocal().append({ day: 1 });
  @Input() orientation: InputOrientation = 'vertical';
  @Input() outerLabel: boolean = true;
  @Input() placeholder: string = 'Enter value';
  @Input() postFix: string = '';
  @Input() required: boolean = false;
  @Input() size: TuiSizeL | TuiSizeS = 's';
  @Input() step: number = 1;
  @Input() timeItems: TuiTime[] = [];
  @Input() type: InputType = 'text';

  //Options
  private _options: UISelectOption[] | null = [];
  @Input() set options(value: UISelectOption[] | null) {
    this._options = value;
    const idOption = this.valueControl.value;
    if (this.type === 'select' && value && idOption) {
      this.value = value?.find((option) => option.id === idOption);
    }
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

  value: any = '';

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  protected stringify: TuiStringHandler<UISelectOption> = (x) => x.Name;
  mapper = (item: any) => item.id;

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

  writeValue(value: any): void {
    this.value = value;
    if (this.type === 'switch') {
      this.valueControl.setValue(value ?? false);
    }
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

  onNgModelChange(value: any): void {
    this.onChange(value);
  }

  /**
   * Getters
   */

  get isEmailOrText() {
    return this.type === 'email' || this.type === 'text';
  }

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
            if (value && typeof value === 'object' && this.value !== value.id) {
              this.onChange(value.id);
              this.value = value.id;
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
  | 'number';

export type InputOrientation = 'horizontal' | 'vertical';
