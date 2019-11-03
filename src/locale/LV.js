const DateTime = require('../DateTime');
const DateFormat = require('../DateFormat');
module.exports = {
  id: 'LV',
  monthNames: ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', ' Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'],
  dayNames: ['Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena'],
  shortDayNames: ['Sv', 'P', 'O', 'T', 'C', 'Pk', 'S'],
  yearsLabel: years => years + ' ' + (years === 1 ? 'G' : 'G'),
  monthsLabel: months => months + ' ' + (months === 1 ? 'Mēnesī' : 'Mēnešiem'),
  daysLabel: days => days + ' ' + (days === 1 ? 'Diena' : 'Dienas'),
  hoursLabel: (hours, minutes) => {
    const hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes);
    return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Stundas' : 'Minūtes')
  },
  clearRangeLabel: 'TODO',
  clearDateLabel: 'TODO',
  shortDateFormat: 'j.n.Y',
  weekDateFormat: 'D j.n.Y',
  dateTimeFormat: 'D j.n.Y G:i',
  firstWeekday: DateTime.MONDAY,
  holidays: {}
}
