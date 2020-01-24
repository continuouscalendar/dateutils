import { DateTime } from '../DateTime.js';
import { DateFormat } from '../DateFormat.js';

export var AU = {
  id: 'AU',
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  yearsLabel: years => years + ' ' + (years === 1 ? 'Year' : 'Years'),
  monthsLabel: months => months + ' ' + (months === 1 ? 'Months' : 'Months'),
  daysLabel: days => days + ' ' + (days === 1 ? 'Day' : 'Days'),
  hoursLabel: (hours, minutes) => {
    const hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes);
    return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Hour' : 'Hours')
  },
  clearRangeLabel: 'Clear Range',
  clearDateLabel: 'Clear Date',
  shortDateFormat: 'j/n/Y',
  weekDateFormat: 'D j/n/Y',
  dateTimeFormat: 'D j/n/Y G:i',
  firstWeekday: DateTime.SUNDAY,
  holidays: {}
}
