import {
  Component,
  EventEmitter,
  Injector,
  Input,
  Optional,
  Output,
  Self,
  forwardRef,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  NgControl,
} from '@angular/forms';
import { TuiDay, TuiStringHandler, TuiTime } from '@taiga-ui/cdk';
import { tuiItemsHandlersProvider, TuiSizeL, TuiSizeS } from '@taiga-ui/core';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  merge,
  startWith,
  takeUntil,
} from 'rxjs';
import { FormProp } from '@type/form.type';
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
    const idOption = this.formValue.value;
    if (this.type === 'select' && value && idOption) {
      this.formValue.value = value?.find((option) => option.id === idOption);
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
      this.formGroup.controls.value.disable();
    }
  }
  get disabled() {
    return this._disabled;
  }

  //Outputs
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  value: string = '';

  private searchSubject = new Subject<string>();
  private destroy$ = new Subject<void>();

  protected stringify: TuiStringHandler<UISelectOption> = (x) => x.Name;
  mapper = (item: any) => item.id;

  private onChange = (value: string) => {};
  private onTouched = () => {};

  formGroup = new FormGroup({
    value: new FormControl(null),
  });

  //Subject Type
  formValue = new FormProp<any>(this.formGroup, 'value', null);

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
    this._updateInternalValue(value);
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
    this._updateInternalValue(value);
    this.onChange(value);
    if (this.type === 'search') {
      this.searchSubject.next(value);
    }
  }

  onNgModelChange(value: any): void {
    this._updateInternalValue(value);
    this.onChange(value);
  }

  private _updateInternalValue(value: any): void {
    this.value = value;
    if (this.type === 'switch') {
      this.formValue.value = value ?? false;
    } else {
      this.formValue.value = value;
    }
  }

  /**
   * Getters
   */

  get isEmailOrText() {
    return this.type === 'email' || this.type === 'text';
  }

  get hadError() {
    return (
      this.formGroup.controls.value.invalid &&
      this.formGroup.controls.value.touched
    );
  }

  /**
   * lifecycle
   */

  ngAfterContentInit() {
    this.formValue.change$.pipe(distinctUntilChanged()).subscribe((value) => {
      if (this.type === 'switch') {
        this.onChange(value);
      } else if (this.type === 'select') {
        if (value && typeof value === 'object' && this.value !== value.id) {
          console.log('👉🏽 select value', value.id);
          this.onChange(value.id);
          this.value = value.id;
        }
      } else {
        this.onChange(value);
      }
    });

    let ngControl = this.injector.get(NgControl, null);
    try {
      if (ngControl) {
        ngControl.valueAccessor = this;

        const externalControl = ngControl.control;
        const internalControl = this.formGroup.controls.value;

        if (!externalControl) return;

        merge(
          externalControl.statusChanges.pipe(startWith(externalControl.status)),
          externalControl.valueChanges.pipe(startWith(externalControl.value))
        )
          .pipe(takeUntil(this.destroy$))
          .subscribe(() => {
            const extTouched = externalControl.touched;
            const extDirty = externalControl.dirty;
            const intTouched = internalControl.touched;
            const intDirty = internalControl.dirty;

            // Si el estado externo difiere del interno, sincronizar
            // if (extTouched !== intTouched || extDirty !== intDirty) {
            //   this.formGroup.reset(externalControl.value);
            // }
          });

        internalControl.setValidators(ngControl.validator);
        internalControl.updateValueAndValidity();
      }
    } catch {
      ngControl = null;
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
