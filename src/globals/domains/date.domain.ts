import { UISelectOption } from '@components/form-input/form-input.component';
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
          return [today.clone().subtract(1, 'months').toDate(), today.toDate()];
        case '5': // Últimos 3 meses
          return [today.clone().subtract(3, 'months').toDate(), today.toDate()];
        case '6': // Último año
          return [today.clone().subtract(1, 'years').toDate(), today.toDate()];
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
    if (rangeDate && rangeDate.length > 0) {
      const startDate = moment(rangeDate[0]);
      const endDate = moment(rangeDate[1]);
      const diffDays = endDate.diff(startDate, 'days');
      console.log('diffDays', diffDays);
      if (diffDays === 0) {
        return { id: '1', Name: 'Hoy' };
      } else if (diffDays === 1) {
        return { id: '2', Name: 'Ayer' };
      } else if (diffDays === 7) {
        return { id: '3', Name: 'Última semana' };
      } else if (diffDays === 30) {
        return { id: '4', Name: 'Último mes' };
      } else if (diffDays === 90) {
        return { id: '5', Name: 'Último 3 meses' };
      } else if (diffDays === 365) {
        return { id: '6', Name: 'Último año' };
      } else {
        return { id: '7', Name: 'Personalizado' };
      }
    }
    return null;
  }
}
