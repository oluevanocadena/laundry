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
    | 'switch'
    | 'select'
    | 'currency'
    | 'number' = 'text';
  @Input() countryCode: string = '+52';
  @Input() outerLabel: boolean = true;
  @Input() size: TuiSizeL | TuiSizeS = 's';
  @Input() clearable: boolean = true;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() step: number = 1;
  @Input() postFix: string = '';
  @Input() timeItems: TuiTime[] = [];
  @Input() minDate: TuiDay | null = TuiDay.currentLocal().append({ day: 1 });
  @Input() debounce: number = 300;
  @Input() required: boolean = false;
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  @Input() options:
    | (UISelectOption | ({ [key: string]: any } & UISelectOption))[]
    | null = [];
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

  protected stringify: TuiStringHandler<UISelectOption> = (x) => x.Name;
  private onChange = (value: string) => {};
  private onTouched = () => {};

  formGroup = new FormGroup({
    value: new FormControl(),
  });

  public ngControl: NgControl | null = null;

  constructor(private injector: Injector) {
    if (this.type === 'switch') {
      this.formGroup.controls.value.valueChanges.subscribe((value) => {
        this.onChange(value);
      });
    }
  }

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
      this.formGroup.controls.value.setValue(value ?? false);
    } else {
      this.formGroup.controls.value.setValue(value);
    }
  }

  /**
   * Getters
   */

  get isEmailOrText() {
    return this.type === 'email' || this.type === 'text';
  }

  get control(): FormControl {
    return this.ngControl?.control as FormControl;
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
    this.formGroup.controls.value.valueChanges
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        this.onChange(value);
      });

    try {
      this.ngControl = this.injector.get(NgControl, null);
      if (this.ngControl) {
        this.ngControl.valueAccessor = this;

        const externalControl = this.ngControl.control;
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

        internalControl.setValidators(this.ngControl.validator);
        internalControl.updateValueAndValidity();
      }
    } catch {
      this.ngControl = null;
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
