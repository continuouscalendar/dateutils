import { DateTime } from './DateTime.js';


class DateParse {

  static parseDate(input, format) {
    const values = input.match(getOrCreateParseRegexp());
    return values ? matchesToDateTime(values) : null;

    function matchesToDateTime(values) {
      const day = matchesToObject(values);
      return DateTime.fromDate(day.Y, (day.m ? day.m : day.n), (day.d ? day.d : day.j));
    }

    function matchesToObject(matchValues) {
      const day = {};
      const keys = format.replace(/[^djmnY]/g, '').split('');
      for (let i = 0; i < keys.length; i++) day[keys[i]] = +matchValues[i + 1];
      return day;
    }

    function getOrCreateParseRegexp() {
      if (DateParse.parseRegexes[format] === undefined) {
        DateParse.parseRegexes[format] = new RegExp(format.replace(/[djmnY]/g, '(\\d+)').replace(/\./g, '\\.'));
      }
      return DateParse.parseRegexes[format];
    }
  }

  static parseTime(timeStr) {
    const splittedTime = splitTime(timeStr.replace(/:|,/i, '.'));
    const time = [+(splittedTime[0]), +(splittedTime[1])];
    return (isHour(time[0]) && isMinute(time[1])) ? time : null;

    function splitTime(timeStr) {
      if (timeStr.indexOf('.') !== -1) {
        return timeStr.split('.')
      }
      const splitTimes = {
        4: [timeStr.slice(0, 2), timeStr.slice(2, 4)],
        3: [timeStr.slice(0, 1), timeStr.slice(1, 3)],
        2: [timeStr, 0]
      };
      return splitTimes[timeStr.length] || [-1, -1];
    }

    function isMinute(minutes) { return !isNaN(minutes) && minutes >= 0 && minutes <= 59 }

    function isHour(hours) { return !isNaN(hours) && hours >= 0 && hours <= 23 }
  }

  static parse (input, locale) {
    if (typeof input === 'string') {
      if (input === 'today') {
        return DateTime.today()
      }
      const format = locale ? locale.shortDateFormat : DateParse.defaultFormat;
      const date = DateParse.parseDate(input, format);
      return date ? date : new DateTime(new Date(input))
    }
    throw new Error("DateParse only accepts strings")
  }
}
DateParse.parseRegexes = [];
DateParse.defaultFormat = 'n/j/Y';





export { DateParse };
