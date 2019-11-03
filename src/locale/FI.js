const DateTime = require('../DateTime');
const DateFormat = require('../DateFormat');
const holidays = require('./FI-holidays');
module.exports = {
  id: 'FI',
  monthNames: ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'],
  dayNames: ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai'],
  shortDayNames: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
  yearsLabel: years => years + ' ' + (years === 1 ? 'vuosi' : 'vuotta'),
  monthsLabel: months => months + ' ' + (months === 1 ? 'kuukausi' : 'kuukautta'),
  daysLabel: days => days + ' ' + (days === 1 ? 'päivä' : 'päivää'),
  hoursLabel: (hours, minutes) => {
    const hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes).replace('.', ',');
    return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'tunti' : 'tuntia')
  },
  clearRangeLabel: 'Poista valinta',
  clearDateLabel: 'Poista valinta',
  shortDateFormat: 'j.n.Y',
  weekDateFormat: 'D j.n.Y',
  dateTimeFormat: 'D j.n.Y k\\lo G:i',
  firstWeekday: DateTime.MONDAY,
  holidays: holidays
}
