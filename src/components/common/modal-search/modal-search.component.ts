import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HelperPage } from '../helper.page';
import { FormControl, FormGroup } from '@angular/forms';
import { TuiDay, TuiDayRange, TuiPortals } from '@taiga-ui/cdk';
import moment from 'moment';

@Component({
  selector: 'modal-search',
  standalone: false,
  templateUrl: './modal-search.component.html',
  styleUrls: ['./modal-search.component.scss'],
})
export class ModalSearchComponent extends HelperPage implements OnInit {
  //Show
  private _show: boolean = false;
  @Input() set show(value: boolean) {
    this._show = value;
  }
  get show() {
    return this._show;
  }
  @Output() showChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() onSearch: EventEmitter<SearchModalEvent> =
    new EventEmitter<SearchModalEvent>();
  @Input() locale : 'es' | 'en' = 'es';

  //FormGroup
  formGroup = new FormGroup({
    search: new FormControl(''),
    date: new FormControl(
      new TuiDayRange(
        TuiDay.fromLocalNativeDate(moment().add(-30, 'day').toDate()),
        TuiDay.fromLocalNativeDate(moment().add(0, 'day').toDate())
      )
    ),
  });

  constructor() {
    super();
  }

  /**
   * API Calls
   */

  /**
   * UI Events
   */

  onSearchClick() {
    this.onSearch.emit({
      search: this.search,
      from: this.dateRange[0],
      to: this.dateRange[1],
    });
    this.close();
  }

  close() {
    this.show = false;
    this.showChange.emit(this.show);
  }

  /**
   * Getters
   */

  get search() {
    return this.formGroup.get('search')?.value ?? '';
  }

  get from() {
    return this.formGroup.get('date')?.value?.from.toLocalNativeDate();
  }

  get to() {
    return this.formGroup.get('date')?.value?.to.toLocalNativeDate();
  }

  get dateRange() {
    let arrayDates = [
      moment(this.from).format('DD/MM/YYYY'),
      moment(this.to).format('DD/MM/YYYY'),
    ];
    return arrayDates;
  }

  get fromNowText(): string {
    const from = this.from;
    const to = this.to;

    if (!from || !to) {
      return '';
    }

    // Configuramos moment con el locale deseado (puedes cambiarlo según necesites)
    moment.locale(this.locale); // o 'en' para inglés

    // Verificar si la fecha final es hoy
    const isToday = moment(to).isSame(moment(), 'day');

    // Si no termina hoy, mostrar rango personalizado
    if (!isToday) {
      return `${moment(from).format('L')} - ${moment(to).format('L')}`;
    }

    const diffDays = moment(to).diff(moment(from), 'days');
    const diffMonths = moment(to).diff(moment(from), 'months');

    // Textos según el locale
    const texts = {
      es: {
        lastDay: 'último día',
        lastDays: (days: number) => `últimos ${days} días`,
        lastMonth: 'último mes',
        lastMonths: (months: number) => `últimos ${months} meses`,
      },
      en: {
        lastDay: 'last day',
        lastDays: (days: number) => `last ${days} days`,
        lastMonth: 'last month',
        lastMonths: (months: number) => `last ${months} months`,
      },
    };

    // Obtener el locale actual
    const currentLocale = moment.locale() as keyof typeof texts;
    const localeTexts = texts[currentLocale];

    if (diffDays === 1) {
      return localeTexts.lastDay;
    } else if (diffDays <= 3) {
      return localeTexts.lastDays(diffDays);
    } else if (diffDays <= 30) {
      return localeTexts.lastDays(diffDays);
    } else if (diffMonths === 1) {
      return localeTexts.lastMonth;
    } else {
      return localeTexts.lastMonths(diffMonths);
    }
  }

  get canContinue() {
    return this.formGroup.valid;
  }

  /**
   * Lifecycle
   */

  ngOnInit() {}
}

export interface SearchModalEvent {
  search: string;
  from: string;
  to: string;
}
