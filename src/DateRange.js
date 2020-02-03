import { DateTime } from "./DateTime.js"
import { DateParse } from "./DateParse.js"

class DateRange {
  constructor(date1, date2) {
    if (!date1 || !date2) {
      throw('two dates must be specified, date1=' + date1 + ', date2=' + date2)
    }
    this.start = (date1.compareTo(date2) > 0 ? date2 : date1)
    this.end = (date1.compareTo(date2) > 0 ? date1 : date2)
    this._days = 0
    this._hours = 0
    this._minutes = 0
    this._valid = true
  }
  static emptyRange() {
    function NullDateRange() {
      this.start = null
      this.end = null
      this.days = () => 0
      this.shiftDays = () => {}
      this.hasDate = () => false
      this.clone = () => DateRange.emptyRange()
      this.expandDaysTo = function () { return this }
      this.hasEndsOnWeekend = () => false
      this.isPermittedRange = () => true
      this.hasSelection = () => false
    }

    return new NullDateRange()
  }
  static rangeWithMinimumSize(oldRange, minimumSize, disableWeekends, outerRange) {
    if (isTooSmallSelection()) {
      let newRange = oldRange.expandDaysTo(minimumSize)
      if (disableWeekends && newRange.hasEndsOnWeekend()) {
        let shiftedDays = newRange.shiftDays(delta(newRange.end.getDay())).shiftInside(outerRange)
        while (!shiftedDays.isPermittedRange(minimumSize, disableWeekends, outerRange) || shiftedDays.end.compareTo(outerRange.end) > 0) {
          if (!shiftedDays.isPermittedRange(minimumSize, false, outerRange)) {
            return DateRange.emptyRange()
          }
          shiftedDays = shiftedDays.shiftDays(1)
        }
        newRange = shiftedDays
      }
      if (!newRange.isPermittedRange(minimumSize, false, outerRange)) {
        return DateRange.emptyRange()
      }
      return newRange
    }
    return oldRange

    function isTooSmallSelection() {
      return minimumSize && oldRange.days() <= minimumSize
    }

    function delta(x) {
      return -((x + 1) % 7 + 1)
    }
  }

  _setDaysHoursAndMinutes() {
    if (this._hasTimes) {
      let ms = parseInt((this.end.getTime() - this.start.getTime()), 10)
      this._days = parseInt(ms / DateTime.DAY, 10)
      ms = ms - (this._days * DateTime.DAY)
      this._hours = parseInt(ms / DateTime.HOUR, 10)
      ms = ms - (this._hours * DateTime.HOUR)
      this._minutes = parseInt(ms / DateTime.MINUTE, 10)
    }
  }

  _dateWithTime(dateWithoutTime, parsedTime) {
    return dateWithoutTime.withTime(parsedTime[0], parsedTime[1])
  }

  hours() {
    return this._hours
  }

  minutes() {
    return this._minutes
  }

  hasDate(date) {
    return date.isBetweenDates(this.start, this.end)
  }

  isValid() {
    return this._valid && this.end.getTime() - this.start.getTime() >= 0
  }

  days() {
    return this._hasTimes ? this._days : Math.round(this.start.distanceInDays(this.end) + 1)
  }

  shiftDays(days) {
    return new DateRange(this.start.plusDays(days), this.end.plusDays(days))
  }

  expandTo(date) {
    let newStart = this.start.clone()
    let newEnd = this.end.clone()
    if (date.compareTo(this.start) < 0) newStart = date
    else if (date.compareTo(this.end) > 0) newEnd = date
    return new DateRange(newStart, newEnd)
  }

  expandDaysTo(days) {
    return new DateRange(this.start, this.start.plusDays(days - 1))
  }

  hasValidSize(minimumDays) {
    return minimumDays < 0 || this.days() >= minimumDays
  }

  hasValidSizeAndEndsOnWorkWeek(minimumDays) {
    return this.hasValidSize(minimumDays) && this.hasEndsOnWeekend()
  }

  and(that) {
    const latestStart = this.start.compareTo(that.start) > 0 ? this.start : that.start
    const earliestEnd = this.end.compareTo(that.end) > 0 ? that.end : this.end
    return latestStart.compareTo(earliestEnd) < 0 ? new DateRange(latestStart, earliestEnd) : DateRange.emptyRange()
  }

  isInside(outer) {
    return this.start.compareTo(outer.start) >= 0 && this.end.compareTo(outer.end) <= 0
  }

  hasEndsOnWeekend() {
    return this.start.isWeekend() || this.end.isWeekend()
  }

  withTimes(startTimeStr, endTimeStr) {
    const parsedStartTime = DateParse.parseTime(startTimeStr)
    const parsedEndTime = DateParse.parseTime(endTimeStr)
    const rangeWithTimes = this.clone()
    if (parsedStartTime && parsedEndTime) {
      rangeWithTimes._valid = true
      rangeWithTimes._hasTimes = true
      rangeWithTimes.start = this._dateWithTime(this.start, parsedStartTime)
      rangeWithTimes.end = this._dateWithTime(this.end, parsedEndTime)
      rangeWithTimes._setDaysHoursAndMinutes()
    } else {
      rangeWithTimes._valid = false
    }
    return rangeWithTimes
  }

  clone() {
    return new DateRange(this.start, this.end)
  }

  toString() {
    return [
      'DateRange:',
      this.start.toString(),
      '-',
      this.end.toString(),
      this._days,
      'days',
      this._hours,
      'hours',
      this._minutes,
      'minutes',
      this._valid ? 'valid' : 'invalid'
    ].join(' ')
  }

  isPermittedRange(minimumSize, disableWeekends, outerRange) {
    return this.hasValidSize(minimumSize) && (!(disableWeekends && this.hasEndsOnWeekend())) && this.isInside(outerRange)
  }

  shiftInside(outerRange) {
    if (this.days() > outerRange.days()) {
      return DateRange.emptyRange()
    }
    const distanceToOuterRangeStart = this.start.distanceInDays(outerRange.start)
    const distanceToOuterRangeEnd = this.end.distanceInDays(outerRange.end)
    if (distanceToOuterRangeStart > 0) {
      return this.shiftDays(distanceToOuterRangeStart)
    }
    if (distanceToOuterRangeEnd < 0) {
      return this.shiftDays(distanceToOuterRangeEnd)
    }
    return this
  }

  hasSelection() {
    return this.days() > 0
  }

}

export { DateRange }
