import { DateTime } from '../DateTime.js';
import { DateFormat } from '../DateFormat.js';
export var DE = {
  id: 'DE',
  monthNames: ['Januar','Februar','März','April','Mai','Juni', 'Juli','August','September','Oktober','November','Dezember'],
  dayNames: ['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'],
  shortDayNames: ['So','Mo','Di','Mi','Do','Fr','Sa'],
  yearsLabel: years => years + ' ' + 'Jahr',
  monthsLabel: months => months + ' ' + (months === 1 ? 'Monat' : 'Months'),
  daysLabel: days => days + ' ' + (days === 1 ? 'Tag' : 'Tage'),
  hoursLabel: (hours, minutes) => {
    const hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes);
    return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Stunde' : 'Stunden')
  },
  clearRangeLabel: 'Auswahl löschen',
  clearDateLabel: 'Auswahl löschen',
  shortDateFormat: 'j.n.Y',
  weekDateFormat: 'D j.n.Y',
  dateTimeFormat: 'D j.n.Y G:i',
  firstWeekday: DateTime.MONDAY,
  holidays: {}
}
