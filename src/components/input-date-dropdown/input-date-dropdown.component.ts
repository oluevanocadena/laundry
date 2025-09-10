import { Component, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { HelperPage } from '@components/common/helper.page';
import { UISelectOption } from '@components/form-input/form-input.component';
import { ListDateOptions } from '@globals/constants/date.constants';
import { DateDomain } from '@globals/domains/date.domain';
import { FormProp } from '@globals/types/form.type';
import { TuiDay, TuiIdentityMatcher, TuiStringHandler } from '@taiga-ui/cdk';
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

  value: (Date | null)[] = [];
  label: string = '';
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

  onChange = (_: any) => {};
  onTouched = () => {};

  constructor() {
    super();
    this.bindEvents();
  }

  bindEvents() {
    this.option.onChange((value) => {
      this.label = value?.Name ?? '';
      const dateOption = DateDomain.castDateOption(value);
      const dtStart = dateOption[0];
      const dtEnd = dateOption[1];

      // Es el valor de taigaUI datepicker
      this.dateStart.value = dtStart ? new TuiDay(dtStart.getFullYear(), dtStart.getMonth(), dtStart.getDate()) : null;
      this.dateEnd.value = dtEnd ? new TuiDay(dtEnd.getFullYear(), dtEnd.getMonth(), dtEnd.getDate()) : null;

      // Es el valor de ngZorro rangepicker
      this.rangeDate = [dtStart ? moment(dtStart).toDate() : new Date(), dtEnd ? moment(dtEnd).toDate() : new Date()];

      // Es el valor de model del formGroup externo
      this.value = [dtStart ? moment(dtStart).toDate() : null, dtEnd ? moment(dtEnd).toDate() : null];
    });

    this.dateStart.onChange((value) => {
      // TuiDay => Date
      this.formGroup.controls['dateEnd'].setValue(new TuiDay(value?.year!, value?.month!, value?.day! + 1), {
        emitEvent: false,
      });

      //Complete the array with the dateEnd (dateStart + 1 day)
      const dateStart = value ? moment(value.toLocalNativeDate()).toDate() : null;
      const dateEnd = moment(dateStart).add(1, 'day').toDate();
      this.value = [dateStart, dateEnd];

      // Es el valor de ngZorro rangepicker
      this.rangeDate = [
        dateStart ? moment(dateStart).toDate() : new Date(),
        dateEnd ? moment(dateEnd).toDate() : new Date(),
      ];

      // castRangeDateInOption
      this.option.value = DateDomain.castRangeDateInOption(this.rangeDate);
    });

    this.dateEnd.onChange((value) => {
      const dateStart = moment(this.dateStart.value?.toLocalNativeDate()).toDate();
      const dateEnd = value ? moment(value.toLocalNativeDate()).toDate() : null;
      this.value = [dateStart, dateEnd]; //Complete the array with the dateStart previous value

      // Es el valor de ngZorro rangepicker
      this.rangeDate = [
        dateStart ? moment(dateStart).toDate() : new Date(),
        dateEnd ? moment(dateEnd).toDate() : new Date(),
      ];

      // castRangeDateInOption
      this.option.value = DateDomain.castRangeDateInOption(this.rangeDate);
    });
  }

  writeValue(value: Date[]): void {
    this.value = value;
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
   * UI Events
   */

  onChangeInlineDatePicker(event: any) {
    console.log(event);
    this.value = [event[0], event[1]];
    this.option.value = DateDomain.castRangeDateInOption(event);
    this.onChange(this.value);
    this.onTouched();
  }

  onCancel(): void {
    this.visibleDropdown = false; // cerrar solo desde aquí
  }

  onAccept(): void {
    this.visibleDropdown = false;

    this.onChange(this.value);
    this.onTouched();
  }

  /**
   * Getters
   */

  /***
   * Lifecycle
   */
  ngOnInit() {
    this.label = this.options[0].Name;
    this.dateStart.value = new TuiDay(moment().year(), moment().month(), moment().date());
    this.dateEnd.value = new TuiDay(moment().year(), moment().month(), moment().date());
    this.rangeDate = [moment().toDate(), moment().toDate()];
  }
}
