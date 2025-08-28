import { TuiDay, TuiTimeLike } from '@taiga-ui/cdk';
import moment from 'moment';

export class TuiTimeDomain {
  static castTuiTime(time?: TuiTimeLike): string {
    if (time) {
      const { hours, minutes, seconds } = time;
      return `${hours}:${minutes}`;
    }
    return '';
  }

  static castTuiDay(day?: TuiDay): string {
    if (day) {
      return moment(day.toString(), 'YYYY-MM-DD').format('YYYY-MM-DD');
    }
    return '';
  }
}
