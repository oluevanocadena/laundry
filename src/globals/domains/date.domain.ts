import { UISelectOption } from '@components/form-input/form-input.component';
import { ListDateOptions } from '@globals/constants/date.constants';
import { TuiDay } from '@taiga-ui/cdk';
import moment from 'moment';

export class DateDomain {
  static castDateOption(option?: UISelectOption | null): (Date | null)[] {
    if (option) {
      const today = moment();
      switch (option.id) {
        case '1': // Hoy
          return [today.toDate(), today.toDate()];
        case '2': // Ayer
          const yesterday = today.clone().subtract(1, 'days');
          return [yesterday.toDate(), yesterday.toDate()];
        case '3': // Semana actual
          const startOfWeek = today.clone().startOf('isoWeek'); // Lunes de la semana actual
          const endOfWeek = today.clone().endOf('isoWeek'); // Domingo de la semana actual
          return [startOfWeek.toDate(), endOfWeek.toDate()];
        case '4': // Último mes
          const startOfMonth = today.clone().startOf('month');
          return [startOfMonth.toDate(), today.toDate()];
        case '5': // Últimos 3 meses
          const startOf3Months = today.clone().subtract(2, 'months').startOf('month');
          return [startOf3Months.toDate(), today.toDate()];
        case '6': // Último año
          const startOfYear = today.clone().startOf('year');
          return [startOfYear.toDate(), today.toDate()];
        case '7': // Personalizado
          return [null, null];
        default:
          return [null, null];
      }
    } else {
      return [null, null];
    }
  }

  static castRangeDateInOption(rangeDate?: Date[]): UISelectOption | null {
    if (!rangeDate || rangeDate.length === 0) {
      return null;
    }
    const [startDate, endDate] = [moment(rangeDate[0]), moment(rangeDate[1])];
    const predefinedRanges: UISelectOption[] = ListDateOptions;

    for (const option of predefinedRanges) {
      const [rangeStart, rangeEnd] = this.castDateOption(option);
      if (startDate.isSame(rangeStart, 'day') && endDate.isSame(rangeEnd, 'day')) {
        return option;
      }
    }
    // Si no coincide con ningún rango predefinido, es personalizado
    return { id: '7', Name: 'Personalizado' };
  }

  static tuiDayToDate(tuiDay?: TuiDay): Date | null {
    if (tuiDay) {
      return moment(tuiDay.toString('YMD'), 'YYYY-MM-DD').toDate();
    }
    return null;
  }

  static dateToTuiDay(date?: Date): TuiDay | null {
    if (date) {
      return new TuiDay(date.getFullYear(), date.getMonth(), date.getDate());
    }
    return null;
  }
}
