import { DateTime } from '../DateTime.js'
import { DateFormat } from '../DateFormat.js'
export var FR = {
  id: 'FR',
  monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
  shortDayNames: ['D','L','M','M','J','V','S'],
  yearsLabel: years => years + ' ' + (years === 1 ? 'Année' : 'Années'),
  monthsLabel: months => months + ' ' + (months === 1 ? 'Mois' : 'Moiss'),
  daysLabel: days => days + ' ' + (days === 1 ? 'Jour' : 'Jours'),
  hoursLabel: (hours, minutes) => {
    const hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes)
    return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Heure' : 'Heures')
  },
  clearRangeLabel: 'Effacer la sélection',
  clearDateLabel: 'Effacer la date',
  shortDateFormat: 'j/n/Y',
  weekDateFormat: 'D j/n/Y',
  dateTimeFormat: 'D j/n/Y G:i',
  firstWeekday: DateTime.MONDAY,
  holidays: {}
}
