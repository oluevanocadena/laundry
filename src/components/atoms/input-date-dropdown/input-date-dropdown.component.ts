import { Component, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HelperPage } from '@components/common/helper.page';
import { UISelectOption } from '@components/atoms/form-input/form-input.component';
import { ListDateOptions } from '@globals/constants/date.constants';
import { DateDomain } from '@globals/domains/date.domain';
import { FormProp } from '@globals/types/form.type';
import { UtilsDomain } from '@globals/utils/utils.domain';
import { TuiBooleanHandler, TuiDay, TuiIdentityMatcher, TuiStringHandler } from '@taiga-ui/cdk';
import moment from 'moment';

@Component({
  selector: 'input-date-dropdown',
  standalone: false,
  templateUrl: './input-date-dropdown.component.html',
  styleUrls: ['./input-date-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDateDropdownComponent),
      multi: true,
    },
  ],
})
export class InputDateDropdownComponent extends HelperPage implements ControlValueAccessor {
  visibleDropdown: boolean = false;
  disabled: boolean = false;

  previusValue: (Date | null)[] = [];
  value: (Date | null)[] = [];
  rangeDate: Date[] = [];

  options: UISelectOption[] = ListDateOptions;

  formGroup = new FormGroup({
    dateStart: new FormControl(),
    dateEnd: new FormControl(),
    option: new FormControl('1'),
  });

  dateStart = new FormProp<TuiDay>(this.formGroup, 'dateStart');
  dateEnd = new FormProp<TuiDay>(this.formGroup, 'dateEnd');
  option = new FormProp<any>(this.formGroup, 'option', '1');

  protected stringifyContent: TuiStringHandler<any> = (x) => {
    const id = typeof x.$implicit === 'string' ? x.$implicit : x.$implicit.id;
    return ListDateOptions?.find((option) => option.id === id)?.Name ?? '';
  };
  protected stringify: TuiStringHandler<UISelectOption> = (x) => {
    return x.Name;
  };
  protected identityMatcher: TuiIdentityMatcher<UISelectOption> = (
    a: UISelectOption | string,
    b: UISelectOption | string,
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

  protected disabledItemHandler: TuiBooleanHandler<UISelectOption> = (item) => {
    return item?.Disabled ?? false;
  };

  protected disabledItemHandlerDateEnd: TuiBooleanHandler<TuiDay> = (item) => {
    const currrentDay = DateDomain.tuiDayToDate(item);
    const startDate = DateDomain.tuiDayToDate(this.dateStart.value!);
    return currrentDay && moment(currrentDay).isSameOrAfter(startDate) ? false : true;
  };

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor() {
    super();
    this.bindEvents();
  }

  writeValue(value: Date[]): void {
    const notNullValue = !value || value.length === 0 ? [new Date(), new Date()] : value;
    this.value = notNullValue;
    this.previusValue = notNullValue;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Binding Events
   */

  bindEvents() {
    this.option.onChange((value) => {
      if (value) {
        const option = typeof value === 'string' ? this.options.find((option) => option.id === value) : value;
        // 7 - personalizado, no se actualiza el valor de los datepickers
        if (option.id !== '7') {
          const dateOption = DateDomain.castDateOption(option);
          const dtStart = dateOption[0];
          const dtEnd = dateOption[1];
          const emitOptions = {
            emitEvent: false,
          };

          console.log('1️⃣ option', value, dateOption);

          // Es el valor de taigaUI datepicker
          this.formGroup.controls['dateStart'].patchValue(
            dtStart ? DateDomain.dateToTuiDay(dtStart) : null,
            emitOptions,
          );
          this.formGroup.controls['dateEnd'].patchValue(dtEnd ? DateDomain.dateToTuiDay(dtEnd) : null, emitOptions);

          // Es el valor de ngZorro rangepicker
          this.rangeDate = [dtStart ?? new Date(), dtEnd ?? new Date()];

          // Es el valor de model del formGroup externo
          this.value = [dtStart, dtEnd];
          if (this.previusValue?.length === 0) {
            const cloned = UtilsDomain.clone(this.value);
            this.previusValue = [moment(cloned[0]).toDate(), moment(cloned[1]).toDate()];
            console.log('💡 previusValue', this.previusValue);
          }
        }
      }
    });

    this.dateStart.onChange((value) => {
      if (value) {
        console.log('2️⃣ dateStart', value as TuiDay);

        // Es el valor de model del formGroup externo (dateStart + 1 day)
        const dateStart = value ? DateDomain.tuiDayToDate(value) : null;
        const currentDateEnd = this.dateEnd.value ? DateDomain.tuiDayToDate(this.dateEnd.value) : null;
        const isBeforeDate = dateStart && currentDateEnd && moment(currentDateEnd).isBefore(dateStart);
        const dateEnd = isBeforeDate
          ? moment(dateStart).add(1, 'day').toDate()
          : currentDateEnd
          ? moment(currentDateEnd).toDate()
          : null;
        this.value = [dateStart, dateEnd];

        // Es el valor de ngZorro rangepicker
        this.rangeDate = [dateStart ? dateStart : new Date(), dateEnd ? dateEnd : new Date()];

        // TuiDay => Date
        if (isBeforeDate) {
          console.log('5️⃣ isBeforeDate', dateEnd);
          this.formGroup.controls['dateEnd'].patchValue(DateDomain.dateToTuiDay(dateEnd!), {
            emitEvent: false,
          });
        }

        // castRangeDateInOption
        const option = DateDomain.castRangeDateInOption(this.rangeDate);
        const currentOption =
          typeof this.option.value === 'string'
            ? this.options.find((option) => option.id === this.option.value)
            : this.option.value;
        if (option?.id.toString() !== currentOption?.id) {
          console.log('4️⃣ Change option', option);
          this.formGroup.controls['option'].setValue(option?.id.toString()!, {
            emitModelToViewChange: true,
          });
        }
      }
    });

    this.dateEnd.onChange((value) => {
      if (value) {
        const dateStart = moment(this.dateStart.value?.toLocalNativeDate()).toDate();
        const dateEnd = value ? moment(value.toLocalNativeDate()).toDate() : null;
        this.value = [dateStart, dateEnd]; //Complete the array with the dateStart previous value

        // Es el valor de ngZorro rangepicker
        this.rangeDate = [
          dateStart ? moment(dateStart).toDate() : new Date(),
          dateEnd ? moment(dateEnd).toDate() : new Date(),
        ];

        // castRangeDateInOption
        const option = DateDomain.castRangeDateInOption(this.rangeDate);
        this.formGroup.controls['option'].setValue(option?.id.toString()!, {
          emitModelToViewChange: true,
        });
      }
    });
  }

  /**
   * UI Events
   */

  onChangeInlineDatePicker(event: any) {
    this.value = [event[0], event[1]];
    const startDate = event[0];
    const endDate = event[1];
    this.formGroup.controls['dateStart'].patchValue(DateDomain.dateToTuiDay(startDate), {
      emitEvent: false,
    });
    this.formGroup.controls['dateEnd'].patchValue(DateDomain.dateToTuiDay(endDate), {
      emitEvent: false,
    });
    this.option.value = DateDomain.castRangeDateInOption(event);
  }

  onCancel(): void {
    this.setDefaultValues();
    this.visibleDropdown = false; // cerrar solo desde aquí
  }

  onAccept(): void {
    this.visibleDropdown = false;
    this.previusValue = UtilsDomain.clone(this.value);
    this.onChange(this.value);
    this.onTouched();
  }

  setDefaultValues(): void {
    const clonedValue = UtilsDomain.clone(this.previusValue);
    this.value = [moment(clonedValue[0]).toDate(), moment(clonedValue[1]).toDate()];
    this.formGroup.controls['dateStart'].patchValue(DateDomain.dateToTuiDay(this.value[0]!), {
      emitEvent: false,
    });
    this.formGroup.controls['dateEnd'].patchValue(DateDomain.dateToTuiDay(this.value[1]!), {
      emitEvent: false,
    });
    this.rangeDate = this.value as Date[];
    this.option.value = DateDomain.castRangeDateInOption(this.value as Date[]);
  }

  /**
   * Getters
   */

  get label(): string {
    return typeof this.option.value === 'string'
      ? this.options.find((option) => option.id === this.option.value)?.Name ?? ''
      : this.option.value?.Name ?? '';
  }

  get inlineLabel(): string {
    const option =
      typeof this.option.value === 'string'
        ? this.options.find((option) => option.id === this.option.value)
        : this.option.value;
    switch (option.id) {
      case '1':
        return 'Hoy';
      case '2':
        return 'Ayer';
      case '3':
        return 'la última semana';
      case '4':
        return 'el último mes';
      case '5':
        return 'los últimos 3 meses';
      case '6':
        return 'el último año';
    }
    return '';
  }

  /***
   * Lifecycle
   */
  ngAfterViewInit() {
    this.option.value = this.options[0];
  }
}
