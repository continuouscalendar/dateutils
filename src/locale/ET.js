import { DateTime } from '../DateTime.js'
import { DateFormat } from '../DateFormat.js'
export var ET = {
  id             : 'ET',
  monthNames     : [ 'Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'],
  dayNames       : ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'],
  shortDayNames  : ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
  yearsLabel     : years => years + ' ' + (years === 1 ? 'Aasta' : 'Aastat'),
  monthsLabel    : months => months + ' ' + (months === 1 ? 'Kuu' : 'Kuud'),
  daysLabel      : days => days + ' ' + (days === 1 ? 'Päev' : 'Päeva'),
  hoursLabel     : (hours, minutes) => {
    const hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes).replace('.', ',')
    return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Tund' : 'Tundi')
  },
  clearRangeLabel: 'TODO',
  clearDateLabel: 'TODO',
  shortDateFormat: 'j.n.Y',
  weekDateFormat : 'D j.n.Y',
  dateTimeFormat : 'D j.n.Y G:i',
  firstWeekday   : DateTime.MONDAY,
  holidays: {}
}
