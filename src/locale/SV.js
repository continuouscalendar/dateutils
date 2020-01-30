import { DateTime } from '../DateTime.js';
import { DateFormat } from '../DateFormat.js';
export var SV = {
  id: 'SV',
  monthNames: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
  dayNames: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
  shortDayNames: ['Sö', 'Må', 'Ti', 'On', 'To', 'Fr', 'Lö'],
  yearsLabel: years => years + ' ' + (years === 1 ? 'År' : 'År'),
  monthsLabel: months => months + ' ' + (months === 1 ? 'Månad' : 'Månader'),
  daysLabel: days => days + ' ' + (days === 1 ? 'Dag' : 'Dagar'),
  hoursLabel: (hours, minutes) => {
    const hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes).replace('.', ',');
    return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Minut' : 'Minuter')
  },
  clearRangeLabel: 'TODO',
  clearDateLabel: 'TODO',
  shortDateFormat: 'j.n.Y',
  weekDateFormat: 'D j.n.Y',
  dateTimeFormat: 'D j.n.Y G:i',
  firstWeekday: DateTime.MONDAY,
  holidays: {}
}
