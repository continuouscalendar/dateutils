import { DateTime } from '../DateTime.js'
import { DateFormat } from '../DateFormat.js'
export var EN = {
  id: 'EN',
  monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  shortDayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  yearsLabel: years => years + ' ' + (years === 1 ? 'Year' : 'Years'),
  monthsLabel: months => months + ' ' + (months === 1 ? 'Months' : 'Months'),
  daysLabel: days => days + ' ' + (days === 1 ? 'Day' : 'Days'),
  hoursLabel: (hours, minutes) => {
    const hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes)
    return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Hour' : 'Hours')
  },
  clearRangeLabel: 'Clear Range',
  clearDateLabel: 'Clear Date',
  shortDateFormat: 'n/j/Y',
  weekDateFormat: 'D n/j/Y',
  dateTimeFormat: 'D n/j/Y G:i',
  firstWeekday: DateTime.SUNDAY,
  holidays: {}
}
