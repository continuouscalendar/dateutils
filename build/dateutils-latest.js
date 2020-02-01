(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.window = global.window || {}));
}(this, (function (exports) { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _newArrowCheck(innerThis, boundThis) {
    if (innerThis !== boundThis) {
      throw new TypeError("Cannot instantiate an arrow function");
    }
  }

  var DateTime =
  /*#__PURE__*/
  function () {
    function DateTime(date) {
      _classCallCheck(this, DateTime);

      if (arguments.length === 0) this.date = new Date();else if (date instanceof Date) this.date = new Date(date);else throw Error('Argument must be a date object. ' + date + ' was given');
    }
    /**
     * Returns DateTime for given date by setting time to midnight
     * @param year
     * @param month
     * @param day
     * @returns {DateTime} new DateTime object or throws error
     */


    _createClass(DateTime, [{
      key: "withResetMS",

      /**
       * Returns new DateTime with milliseconds set to 0
       */
      value: function withResetMS() {
        var newDate = this.clone();
        newDate.date.setMilliseconds(0);
        return newDate;
      }
      /**
       * Returns new DateTime with given hours and minutes and 0 milliseconds
       * @param h 0-23
       * @param m 0-59
       */

    }, {
      key: "withTime",
      value: function withTime(h, m) {
        if (typeof h === 'string') {
          var hoursAndMinutes = h.split(':');
          h = hoursAndMinutes[0];
          m = hoursAndMinutes[1];
        }

        var dateWithTime = this.clone();
        dateWithTime.date.setHours(h);
        dateWithTime.date.setMinutes(m);
        dateWithTime.date.setSeconds(0);
        dateWithTime.date.setMilliseconds(0);
        return dateWithTime;
      }
      /**
       * Returns new DateTime with current time
       * @returns {DateTime}
       */

    }, {
      key: "getTime",

      /**
       * Returns time in milliseconds
       * @returns {number} milliseconds
       */
      value: function getTime() {
        return this.date.getTime();
      }
      /**
       * Returns year
       * @returns {number} year
       */

    }, {
      key: "getFullYear",
      value: function getFullYear() {
        return this.date.getFullYear();
      }
      /**
       * Returns day of month
       * @returns {number} 1-31
       */

    }, {
      key: "getDate",
      value: function getDate() {
        return this.date.getDate();
      }
      /**
       * Returns month
       * @returns {number} 1-12
       */

    }, {
      key: "getMonth",
      value: function getMonth() {
        return this.date.getMonth() + 1;
      }
      /**
       * Returns day of week. 0=sunday, 1=monday, ...
       * @returns {number} 0-6
       */

    }, {
      key: "getDay",
      value: function getDay() {
        return this.date.getDay();
      }
      /**
       * Returns hours
       * @returns {number} 0-23
       */

    }, {
      key: "getHours",
      value: function getHours() {
        return this.date.getHours();
      }
      /**
       * Returns minutes
       * @returns {number} 0-59
       */

    }, {
      key: "getMinutes",
      value: function getMinutes() {
        return this.date.getMinutes();
      }
      /**
       * Returns seconds
       * @returns {number} 0-59
       */

    }, {
      key: "getSeconds",
      value: function getSeconds() {
        return this.date.getSeconds();
      }
      /**
       * Returns milliseconds
       * @returns {number} 0-999
       */

    }, {
      key: "getMilliseconds",
      value: function getMilliseconds() {
        return this.date.getMilliseconds();
      }
      /**
       * Returns days in month for current DateTime
       * @returns {number}
       */

    }, {
      key: "getDaysInMonth",
      value: function getDaysInMonth() {
        return DateTime.getDaysInMonth(this.getFullYear(), this.getMonth());
      }
      /**
       * Returns days in year for current Date
       * @returns {*}
       */

    }, {
      key: "getDayInYear",
      value: function getDayInYear() {
        return DateTime.getDayInYear(this.getFullYear(), this.getMonth(), this.getDate());
      }
      /**
       * Returns new DateTime with given days later
       * @param days
       * @returns {DateTime}
       */

    }, {
      key: "plusDays",
      value: function plusDays(days) {
        var newDateTime = DateTime.fromMillis(this.getTime() + days * DateTime.DAY);
        var hours = this.getHours(); // Fix the DateTime offset caused by daylight saving time

        var delta = hours - newDateTime.getHours();

        if (delta !== 0) {
          // Correct the delta to be between [-12, 12]
          if (delta > 12) {
            delta -= 24;
          }

          if (delta < -12) {
            delta += 24;
          }

          return DateTime.fromMillis(newDateTime.getTime() + delta * DateTime.HOUR);
        }

        return newDateTime;
      }
      /**
       * Returns new DateTime with given minutes later
       * @param minutes
       * @returns {DateTime}
       */

    }, {
      key: "plusMinutes",
      value: function plusMinutes(minutes) {
        return DateTime.fromMillis(this.clone().getTime() + minutes * DateTime.MINUTE);
      }
      /**
       * Returns new DateTime with given minutes earlier
       * @param minutes
       * @returns {DateTime}
       */

    }, {
      key: "minusMinutes",
      value: function minusMinutes(minutes) {
        return this.plusMinutes(-minutes);
      }
      /**
       * Returns new DateTime with given days earlier
       * @param days
       * @returns {DateTime}
       */

    }, {
      key: "minusDays",
      value: function minusDays(days) {
        return this.plusDays(-days);
      }
      /**
       * Compares DateTimes. Examples:
       * earlier.compareTo(later)) < 0
       * later.compareTo(earlier)) > 0
       * later.compareTo(later)) == 0
        * @param date {DateTime}
       * @returns {number}
       */

    }, {
      key: "compareTo",
      value: function compareTo(date) {
        if (!date) {
          return 1;
        }

        var diff = this.getTime() - date.getTime();
        return diff === 0 ? 0 : diff / Math.abs(diff);
      }
      /**
       * Returns true if DateTime is within today
       */

    }, {
      key: "isToday",
      value: function isToday() {
        return this.equalsOnlyDate(DateTime.today());
      }
      /**
       * Returns the week number of current DateTime
       * @param {string} weekNumberingSystem US or ISO
       * @returns {number}
       */

    }, {
      key: "getWeekInYear",
      value: function getWeekInYear(weekNumberingSystem) {
        if (weekNumberingSystem !== 'US' && weekNumberingSystem !== 'ISO') {
          throw 'Week numbering system must be either US or ISO, was ' + weekNumberingSystem;
        }

        var firstDay = new Date(this.getFullYear(), 0, 1).getDay();

        if (weekNumberingSystem === 'US') {
          return Math.ceil((this.getDayInYear() + firstDay) / 7);
        }

        var THU = 4;
        var weekday = this.getDay();
        if (weekday === 0) weekday = 7;
        if (firstDay === 0) firstDay = 7; // If Dec 29 falls on Mon, Dec 30 on Mon or Tue, Dec 31 on Mon - Wed, it's on the first week of next year

        if (this.getMonth() === 12 && this.getDate() >= 29 && this.getDate() - weekday > 27) {
          return 1;
        } // If Jan 1-3 falls on Fri, Sat or Sun, it's on the last week of the previous year


        if (this.getMonth() === 1 && this.getDate() < 4 && weekday > THU) {
          return new DateTime(new Date(this.getFullYear() - 1, 11, 31)).getWeekInYear('ISO');
        }

        var week = Math.ceil((this.getDayInYear() + firstDay - 1) / 7); // If first days of this year are on last year's last week, the above gives one week too much

        if (firstDay > THU) week--;
        return week;
      }
      /**
       * Creates clone of current DateTime
       * @returns {DateTime}
       */

    }, {
      key: "clone",
      value: function clone() {
        return new DateTime(this.date);
      }
      /**
       * Returs true if month is odd, ie. january=true
       * @returns {boolean}
       */

    }, {
      key: "isOddMonth",
      value: function isOddMonth() {
        return this.getMonth() % 2 === 0;
      }
      /**
       * Returns true if given DateTime has same day as current DateTime
       * @param date
       * @returns {boolean}
       */

    }, {
      key: "equalsOnlyDate",
      value: function equalsOnlyDate(date) {
        if (!date) return false;
        return this.getMonth() === date.getMonth() && this.getDate() === date.getDate() && this.getFullYear() === date.getFullYear();
      }
      /**
       * Returns first date of month from current date
       * @returns {DateTime}
       */

    }, {
      key: "firstDateOfMonth",
      value: function firstDateOfMonth() {
        return DateTime.fromDate(this.getFullYear(), this.getMonth(), 1);
      }
      /**
       * Returns last date of month from current date
       * @returns {DateTime}
       */

    }, {
      key: "lastDateOfMonth",
      value: function lastDateOfMonth() {
        return DateTime.fromDate(this.getFullYear(), this.getMonth(), this.getDaysInMonth());
      }
      /**
       * Returns number of days between current and given date
       * @param date
       * @returns {number}
       */

    }, {
      key: "distanceInDays",
      value: function distanceInDays(date) {
        var first = parseInt(this.getTime() / DateTime.DAY, 10);
        var last = parseInt(date.getTime() / DateTime.DAY, 10);
        return last - first;
      }
      /**
       * Returns new DateTime from same week with given weekDay
       * @param weekday 0=sunday, 1=monday, ...
       * @returns {DateTime}
       */

    }, {
      key: "withWeekday",
      value: function withWeekday(weekday) {
        return this.plusDays(weekday - this.getDay());
      }
      /**
       * Returns new DateTime with midnight time
       * @returns {DateTime}
       */

    }, {
      key: "getOnlyDate",
      value: function getOnlyDate() {
        return DateTime.fromDate(this.getFullYear(), this.getMonth(), this.getDate());
      }
      /**
       * Returns true if date is in weekend
       * @returns {boolean}
       */

    }, {
      key: "isWeekend",
      value: function isWeekend() {
        return this.getDay() === 6 || this.getDay() === 0;
      }
      /**
       * Returns default string representation
       */

    }, {
      key: "toString",
      value: function toString() {
        return this.toISOString();
      }
      /**
       * Returns first date from same week
       * @param locale Based on locale it can be a monday or a sunday
       * @returns {DateTime}
       */

    }, {
      key: "getFirstDateOfWeek",
      value: function getFirstDateOfWeek(locale) {
        var firstWeekday = locale ? locale.firstWeekday : DateTime.MONDAY;
        if (firstWeekday == this.getDay) return this.clone();else return this.plusDays(firstWeekday - this.getDay() - (firstWeekday > this.getDay() ? 7 : 0));
      }
      /**
       * Returns ISO DateTime string: YYYY-MM-DDT:HH:MM:SS
       * @returns {string}
       */

    }, {
      key: "toISOString",
      value: function toISOString() {
        return isoDate.call(this) + 'T' + isoTime.call(this);
      }
      /**
       * Returns ISO Date string: YYYY-MM-DD
       */

    }, {
      key: "toISODateString",
      value: function toISODateString() {
        return isoDate.call(this);
      }
      /**
       * Returns true if current DateTime is between start and end DateTimes
       * @param {DateTime} start
       * @param {DateTime} end
       * @returns {boolean}
       */

    }, {
      key: "isBetweenDates",
      value: function isBetweenDates(start, end) {
        if (start.getTime() > end.getTime()) throw Error("start date can't be after end date");
        var onlyDate = this.getOnlyDate();
        return onlyDate.compareTo(start.getOnlyDate()) >= 0 && onlyDate.compareTo(end.getOnlyDate()) <= 0;
      }
      /**
       * Returns number of days for given month
       * @param {Number} year Year of month
       * @param {Number} month Number of month (1-12)
       * @returns {Number} [28-31]
       */

    }], [{
      key: "fromDate",
      value: function fromDate(year, month, day) {
        return DateTime.fromDateTime(year, month, day, 0, 0, 0);
      }
      /**
       * Returns DateTime for given date and time
       * @param year
       * @param month 1-12
       * @param day 1-31
       * @param hours 0-23
       * @param minutes 0-59
       * @param seconds 0-59
       * @returns {DateTime} new DateTime object or throws error
       */

    }, {
      key: "fromDateTime",
      value: function fromDateTime(year, month, day, hours, minutes, seconds) {
        return new DateTime(createSafeDate(+year, +month, +day, +hours, +minutes, +seconds || 0));
      }
      /**
       * Returns DateTime from given Date object
       * @param date
       * @returns {DateTime}
       */

    }, {
      key: "fromDateObject",
      value: function fromDateObject(date) {
        return new DateTime(date);
      }
      /**
       * Returns DateTime from ISO date ignoring time information
       * @param isoDate String YYYY-MM-DDTHH-MM
       * @return {DateTime}
       */

    }, {
      key: "fromIsoDate",
      value: function fromIsoDate(isoDate) {
        var optionalTimePattern = /^\d{4}-[01]\d-[0-3]\d(T[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?))?$/;
        if (!optionalTimePattern.test(isoDate)) throw Error(isoDate + ' is not valid ISO Date (YYYY-MM-DD or YYYY-MM-DDTHH:MM)');
        var date = parseDate(isoDate.split('T')[0]);
        return DateTime.fromDate(date.year, date.month, date.day);
      }
      /**
       * Returns DateTime with time from ISO date
       * @param isoDateTime String YYYY-MM-DDTHH-MM
       * @return {DateTime} Returns DateTime or throws error for invalid syntax
       */

    }, {
      key: "fromIsoDateTime",
      value: function fromIsoDateTime(isoDateTime) {
        var fullPatternTest = /\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z?)/;
        if (!fullPatternTest.test(isoDateTime)) throw Error(isoDateTime + ' is not valid ISO Date (YYYY-MM-DDTHH:MM)');
        var dateAndTime = isoDateTime.split('T');
        var time = parseTime(dateAndTime.length === 2 && dateAndTime[1]);
        var date = parseDate(dateAndTime[0]);
        return DateTime.fromDateTime(date.year, date.month, date.day, time.hours, time.minutes, time.seconds);
      }
      /**
       * Returns DateTime from current time in milliseconds
       * @param ms
       * @returns {DateTime}
       */

    }, {
      key: "fromMillis",
      value: function fromMillis(ms) {
        return new DateTime(new Date(ms));
      }
    }, {
      key: "now",
      value: function now() {
        return new DateTime();
      }
      /**
       * Returns new DateTime with current date and midnight time
       */

    }, {
      key: "today",
      value: function today() {
        return DateTime.now().getOnlyDate();
      }
    }, {
      key: "getDaysInMonth",
      value: function getDaysInMonth(year, month) {
        if (month > 12 || month < 1) throw new Error('Month must be between 1-12');
        var yearAndMonth = year * 12 + month;
        return DateTime.fromDate(Math.floor(yearAndMonth / 12), yearAndMonth % 12 + 1, 1).minusDays(1).getDate();
      }
      /**
       * Returns index of given day from beginning of year
       * @param year year
       * @param month month
       * @param day day
       * @returns {Number} index number starting grom beginning of year
       */

    }, {
      key: "getDayInYear",
      value: function getDayInYear(year, month, day) {
        return DateTime.fromDate(year, 1, 1).distanceInDays(DateTime.fromDate(year, month, day)) + 1;
      }
    }]);

    return DateTime;
  }();

  DateTime.SUNDAY = 0;
  DateTime.MONDAY = 1;
  DateTime.TUESDAY = 2;
  DateTime.WEDNESDAY = 3;
  DateTime.THURSDAY = 4;
  DateTime.FRIDAY = 5;
  DateTime.SATURDAY = 6;
  DateTime.daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  DateTime.y2kYear = 50;
  DateTime.monthNumbers = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11
  };
  DateTime.SECOND = 1000;
  DateTime.MINUTE = 60 * DateTime.SECOND;
  DateTime.HOUR = 60 * DateTime.MINUTE;
  DateTime.DAY = 24 * DateTime.HOUR;
  DateTime.WEEK = 7 * DateTime.DAY;

  function isoDate() {
    return this.getFullYear() + '-' + twoDigits(this.getMonth()) + '-' + twoDigits(this.getDate());
  }

  function isoTime() {
    return twoDigits(this.getHours()) + ':' + twoDigits(this.getMinutes()) + ':' + twoDigits(this.getSeconds());
  }

  function twoDigits(value) {
    return value < 10 ? '0' + value : '' + value;
  }

  function createSafeDate(year, month, date, hours, minutes, seconds) {
    hours = hours || 0;
    minutes = minutes || 0;
    seconds = seconds || 0;
    var newDate = new Date(year, month - 1, date, hours, minutes, seconds, 0);
    if (newDate.toString() === 'Invalid Date' || month !== newDate.getMonth() + 1 || year !== newDate.getFullYear() || date !== newDate.getDate() || hours !== newDate.getHours() || minutes !== newDate.getMinutes() || seconds !== newDate.getSeconds()) throw Error('Invalid Date: ' + year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds);
    return newDate;
  }

  function parseDate(str) {
    var dateComponents = str.split('-');
    return {
      year: +dateComponents[0],
      month: +dateComponents[1],
      day: +dateComponents[2]
    };
  }

  function parseTime(str) {
    if (str) {
      var timeComponents = str.split(':');
      return {
        hours: +timeComponents[0],
        minutes: +timeComponents[1],
        seconds: +timeComponents[2] || 0
      };
    } else {
      return {
        hours: 0,
        minutes: 0
      };
    }
  }

  var _this = undefined;
  var codes = {
    d: function d(_d) {
      _newArrowCheck(this, _this);

      return leftPad(_d.getDate(), 2, '0');
    }.bind(undefined),
    D: function D(d, l) {
      _newArrowCheck(this, _this);

      return l.shortDayNames[d.getDay()];
    }.bind(undefined),
    j: function j(d) {
      _newArrowCheck(this, _this);

      return d.getDate();
    }.bind(undefined),
    l: function l(d, _l) {
      _newArrowCheck(this, _this);

      return _l.dayNames[d.getDay()];
    }.bind(undefined),
    w: function w(d) {
      _newArrowCheck(this, _this);

      return d.getDay();
    }.bind(undefined),
    z: function z(d) {
      _newArrowCheck(this, _this);

      return d.getDayInYear();
    }.bind(undefined),
    F: function F(d, l) {
      _newArrowCheck(this, _this);

      return l.monthNames[d.getMonth() - 1];
    }.bind(undefined),
    m: function m(d) {
      _newArrowCheck(this, _this);

      return leftPad(d.getMonth(), 2, '0');
    }.bind(undefined),
    M: function M(d, l) {
      _newArrowCheck(this, _this);

      return l.monthNames[d.getMonth() - 1].substring(0, 3);
    }.bind(undefined),
    n: function n(d) {
      _newArrowCheck(this, _this);

      return d.getMonth();
    }.bind(undefined),
    t: function t(d) {
      _newArrowCheck(this, _this);

      return d.getDaysInMonth();
    }.bind(undefined),
    Y: function Y(d) {
      _newArrowCheck(this, _this);

      return d.getFullYear();
    }.bind(undefined),
    y: function y(d) {
      _newArrowCheck(this, _this);

      return ('' + d.getFullYear()).substring(2, 4);
    }.bind(undefined),
    a: function a(d) {
      _newArrowCheck(this, _this);

      return d.getHours() < 12 ? 'am' : 'pm';
    }.bind(undefined),
    A: function A(d) {
      _newArrowCheck(this, _this);

      return d.getHours() < 12 ? 'AM' : 'PM';
    }.bind(undefined),
    g: function g(d) {
      _newArrowCheck(this, _this);

      return d.getHours() % 12 ? d.getHours() % 12 : 12;
    }.bind(undefined),
    G: function G(d) {
      _newArrowCheck(this, _this);

      return d.getHours();
    }.bind(undefined),
    h: function h(d) {
      _newArrowCheck(this, _this);

      return leftPad(d.getHours() % 12 ? d.getHours() % 12 : 12, 2, '0');
    }.bind(undefined),
    H: function H(d) {
      _newArrowCheck(this, _this);

      return leftPad(d.getHours(), 2, '0');
    }.bind(undefined),
    i: function i(d) {
      _newArrowCheck(this, _this);

      return leftPad(d.getMinutes(), 2, '0');
    }.bind(undefined),
    s: function s(d) {
      _newArrowCheck(this, _this);

      return leftPad(d.getSeconds(), 2, '0');
    }.bind(undefined),
    Z: function Z(d) {
      _newArrowCheck(this, _this);

      return d.date.getTimezoneOffset() / -60;
    }.bind(undefined)
  };
  /**
   * Formatting patterns listed above
   * @param {Date} d [01-31]
   * @param {Short_Day_Name} D [Su, Mo, Tu, We, Th, Fr, Sa]
   * @param {Date} j [1-31]
   * @param {Full_day_name} l  [Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday]
   * @param {Week_day_number} w 0=Sunday, 1=Monday, 2=Tuesday etc...
   * @param {Nth_day_of_year} z [1-365] except leap years
   * @param {Full_month_name} F [January, February, ...]
   * @param {Month_number} m [01-12]
   * @param {Month_name_stripped_to_three_letters} M [Jan, Feb, ...]
   * @param {Month_number} n [1-12]
   * @param {Days_in_current_month} t [28-31]
   * @param {Full_year} Y [1900, ...]
   * @param {Last_two_digits_of_a_year} y [01-99]
   * @param {Time_postfix} a [am|pm]
   * @param {Time_postfix} A [AM|PM]
   * @param {Hours_in_12h_format} g [1-12]
   * @param {Hours_in_24h_format} G [0-23]
   * @param {Hour_in_12h_format_with_padding} h [01-12]
   * @param {Hours_in_24h_format_with_padding} H [00-23]
   * @param {Minutes_with_padding} i [00-59]
   * @param {Seconds_with_padding} s [00-59]
   * @param {Timezone} Z 2 for GMT+2
   */

  var DateFormat =
  /*#__PURE__*/
  function () {
    function DateFormat() {
      _classCallCheck(this, DateFormat);
    }

    _createClass(DateFormat, null, [{
      key: "hoursAndMinutes",

      /** Returns hours and minutes as hours in decimal. For example <code>DateFormat.hoursAndMinutes(22,30)</code> returns <code>22.5</code> */
      value: function hoursAndMinutes(hours, minutes) {
        return (Math.round((hours + minutes / 60) * 100) / 100).toString();
      }
      /** Formats dateTime. For example <code>DateFormat.format(DateTime.fromDateTime(2014, 2, 25, 14, 30), 'Y-m-d H:i:s', DateLocale.EN)</code> returns <code>2014-02-25 14:30:00</code>
       * @param {DateTime} dateTime DateTime object to be formatted
       * @param {String} format  Pattern to be used for formatting
       * @param {DateLocale} locale  Locale to be used for formatting
       * @see DateFormat.patterns
       * @returns {String} Formatted date
       * */

    }, {
      key: "format",
      value: function format(dateTime, _format, locale) {
        var result = '';
        var special = false;
        var ch = '';

        for (var i = 0; i < _format.length; ++i) {
          ch = _format.charAt(i);

          if (!special && ch === '\\') {
            special = true;
          } else {
            if (special) {
              special = false;
              result += ch;
            } else {
              result += codeToValue(dateTime, ch, locale);
            }
          }
        }

        return result;
      }
      /**
       * Shorthand for formatting in short date format. For example <code>DateFormat.shortDateFormat(DateTime.fromDateTime(2014, 2, 25, 14, 30), DateLocale.EN)</code> returns <code>2/25/2014</code>
       * @param {DateTime} dateTime DateTime to be formattend
       * @param {DateLocale} locale locale to be used for formatting
       * @returns {String} Returns Date in short date format depending on locale
       */

    }, {
      key: "shortDateFormat",
      value: function shortDateFormat(dateTime, locale) {
        return DateFormat.format(dateTime, locale ? locale.shortDateFormat : 'n/j/Y', locale);
      }
      /**
       * Formats DateRange. TODO
       * @param {DateRange} dateRange DateRange to be formatted
       * @param {DateLocale} locale to be used for formatting
       * @returns {string} returns date range in formatted form, for example <code>2/25/2014-2/15/2015</code>
       */

    }, {
      key: "formatRange",
      value: function formatRange(dateRange, locale) {
        if (dateRange._hasTimes) {
          return locale.daysLabel(dateRange.days()) + ' ' + locale.hoursLabel(dateRange.hours(), dateRange.minutes());
        } else {
          return DateFormat.shortDateFormat(dateRange.start, locale) + ' - ' + DateFormat.shortDateFormat(dateRange.end, locale);
        }
      }
      /**
       * Need's documentation
       * @param dateRange
       * @param locale
       * @returns {*}
       */

    }, {
      key: "formatDefiningRangeDuration",
      value: function formatDefiningRangeDuration(dateRange, locale) {
        var years = parseInt(dateRange.days() / 360, 10);
        if (years > 0) return locale.yearsLabel(years);
        var months = parseInt(dateRange.days() / 30, 10);
        if (months > 0) return locale.monthsLabel(months);
        return locale.daysLabel(dateRange.days());
      }
    }]);

    return DateFormat;
  }();
  /**
   * List of commonly used date format patterns
   * Above are listed results for following command: <code>DateFormat.format(DateTime.fromDateTime(2014, 2, 5, 14, 30), PATTERN,  DateLocale.EN)</code>
   *
   * @param {DateLocale.EN} ISO8601LongPattern 2014-02-05 14:30:00
   * @param {DateLocale.EN} ISO8601ShortPattern 2014-02-05
   * @param {DateLocale.EN} ShortDatePattern 2/5/2014
   * @param {DateLocale.EN} ShortDatePattern 2/5/2014
   * @param {DateLocale.EN} FiShortDatePattern  5.2.2014
   * @param {DateLocale.EN} FiWeekdayDatePattern We 5.2.2014
   * @param {DateLocale.FI} FiWeekdayDateTimePattern ke 5.2.2014 klo 14:30 (for DateLocale.FI)
   * @param {DateLocale.EN} LongDatePattern Wednesday, February 05, 2014
   * @param {DateLocale.EN} FullDateTimePattern Wednesday, February 05, 2014 2:30:00 PM
   * @param {DateLocale.EN} MontdDayPattern February 05
   * @param {DateLocale.EN} ShortTimePattern 2:30 PM
   * @param {DateLocale.EN} LongTimePattern 2:30:00 PM
   * @param {DateLocale.EN} SortableDateTimePattern 2014-02-05T14:30:00
   * @param {DateLocale.EN} UniversalSortableDateTimePattern 2014-02-05 14:30:00+-200
   * @param {DateLocale.EN} YearMontdPattern February, 2014
   */


  DateFormat.patterns = {
    ISO8601LongPattern: 'Y-m-d H:i:s',
    ISO8601ShortPattern: 'Y-m-d',
    ShortDatePattern: 'n/j/Y',
    FiShortDatePattern: 'j.n.Y',
    FiWeekdayDatePattern: 'D j.n.Y',
    FiWeekdayDateTimePattern: 'D j.n.Y k\\lo G:i',
    LongDatePattern: 'l, F d, Y',
    FullDateTimePattern: 'l, F d, Y g:i:s A',
    MonthDayPattern: 'F d',
    ShortTimePattern: 'g:i A',
    LongTimePattern: 'g:i:s A',
    SortableDateTimePattern: 'Y-m-d\\TH:i:s',
    UniversalSortableDateTimePattern: 'Y-m-d H:i:sO',
    YearMonthPattern: 'F, Y'
  };
  /** @private */

  function codeToValue(dateTime, ch, locale) {
    return ch in codes ? codes[ch](dateTime, locale) : ch;
  }
  /** @private */


  function leftPad(val, size, ch) {
    var result = String(val);

    if (ch === null) {
      ch = ' ';
    }

    while (result.length < size) {
      result = ch + result;
    }

    return result;
  }

  var holidays = {
    "2015-01-01": "Uudenvuodenpäivä",
    "2015-01-06": "Loppiainen",
    "2015-04-03": "Pitkäperjantai",
    "2015-04-04": "Pääsiäislauantai",
    "2015-04-05": "Pääsiäispäivä",
    "2015-04-06": "2. pääsiäispäivä",
    "2015-05-01": "Vappu",
    "2015-05-14": "Helatorstai",
    "2015-06-19": "Juhannusaatto",
    "2015-06-20": "Juhannuspäivä",
    "2015-10-31": "Pyhäinpäivä",
    "2015-12-06": "Itsenäisyyspäivä",
    "2015-12-24": "Jouluaatto",
    "2015-12-25": "Joulupäivä",
    "2015-12-26": "Tapaninpäivä",
    "2016-01-01": "Uudenvuodenpäivä",
    "2016-01-06": "Loppiainen",
    "2016-03-25": "Pitkäperjantai",
    "2016-03-26": "Pääsiäislauantai",
    "2016-03-27": "Pääsiäispäivä",
    "2016-03-28": "2. pääsiäispäivä",
    "2016-05-01": "Vappu",
    "2016-05-05": "Helatorstai",
    "2016-06-24": "Juhannusaatto",
    "2016-06-25": "Juhannuspäivä",
    "2016-11-05": "Pyhäinpäivä",
    "2016-12-06": "Itsenäisyyspäivä",
    "2016-12-24": "Jouluaatto",
    "2016-12-25": "Joulupäivä",
    "2016-12-26": "Tapaninpäivä",
    "2017-01-01": "Uudenvuodenpäivä",
    "2017-01-06": "Loppiainen",
    "2017-04-14": "Pitkäperjantai",
    "2017-04-15": "Pääsiäislauantai",
    "2017-04-16": "Pääsiäispäivä",
    "2017-04-17": "2. pääsiäispäivä",
    "2017-05-01": "Vappu",
    "2017-05-25": "Helatorstai",
    "2017-06-23": "Juhannusaatto",
    "2017-06-24": "Juhannuspäivä",
    "2017-11-04": "Pyhäinpäivä",
    "2017-12-06": "Itsenäisyyspäivä",
    "2017-12-24": "Jouluaatto",
    "2017-12-25": "Joulupäivä",
    "2017-12-26": "Tapaninpäivä",
    "2018-01-01": "Uudenvuodenpäivä",
    "2018-01-06": "Loppiainen",
    "2018-03-30": "Pitkäperjantai",
    "2018-03-31": "Pääsiäislauantai",
    "2018-04-01": "Pääsiäispäivä",
    "2018-04-02": "2. pääsiäispäivä",
    "2018-05-01": "Vappu",
    "2018-05-10": "Helatorstai",
    "2018-06-22": "Juhannusaatto",
    "2018-06-23": "Juhannuspäivä",
    "2018-11-03": "Pyhäinpäivä",
    "2018-12-06": "Itsenäisyyspäivä",
    "2018-12-24": "Jouluaatto",
    "2018-12-25": "Joulupäivä",
    "2018-12-26": "Tapaninpäivä",
    "2019-01-01": "Uudenvuodenpäivä",
    "2019-01-06": "Loppiainen",
    "2019-04-19": "Pitkäperjantai",
    "2019-04-20": "Pääsiäislauantai",
    "2019-04-21": "Pääsiäispäivä",
    "2019-04-22": "2. pääsiäispäivä",
    "2019-05-01": "Vappu",
    "2019-05-30": "Helatorstai",
    "2019-06-21": "Juhannusaatto",
    "2019-06-22": "Juhannuspäivä",
    "2019-11-02": "Pyhäinpäivä",
    "2019-12-06": "Itsenäisyyspäivä",
    "2019-12-24": "Jouluaatto",
    "2019-12-25": "Joulupäivä",
    "2019-12-26": "Tapaninpäivä",
    "2020-01-01": "Uudenvuodenpäivä",
    "2020-01-06": "Loppiainen",
    "2020-04-10": "Pitkäperjantai",
    "2020-04-11": "Pääsiäislauantai",
    "2020-04-12": "Pääsiäispäivä",
    "2020-04-13": "2. pääsiäispäivä",
    "2020-05-01": "Vappu",
    "2020-05-21": "Helatorstai",
    "2020-06-19": "Juhannusaatto",
    "2020-06-20": "Juhannuspäivä",
    "2020-10-31": "Pyhäinpäivä",
    "2020-12-06": "Itsenäisyyspäivä",
    "2020-12-24": "Jouluaatto",
    "2020-12-25": "Joulupäivä",
    "2020-12-26": "Tapaninpäivä",
    "2021-01-01": "Uudenvuodenpäivä",
    "2021-01-06": "Loppiainen",
    "2021-04-02": "Pitkäperjantai",
    "2021-04-03": "Pääsiäislauantai",
    "2021-04-04": "Pääsiäispäivä",
    "2021-04-05": "2. pääsiäispäivä",
    "2021-05-01": "Vappu",
    "2021-05-13": "Helatorstai",
    "2021-06-25": "Juhannusaatto",
    "2021-06-26": "Juhannuspäivä",
    "2021-11-06": "Pyhäinpäivä",
    "2021-12-06": "Itsenäisyyspäivä",
    "2021-12-24": "Jouluaatto",
    "2021-12-25": "Joulupäivä",
    "2021-12-26": "Tapaninpäivä"
  };

  var _this$1 = undefined;
  var FI = {
    id: 'FI',
    monthNames: ['tammikuu', 'helmikuu', 'maaliskuu', 'huhtikuu', 'toukokuu', 'kesäkuu', 'heinäkuu', 'elokuu', 'syyskuu', 'lokakuu', 'marraskuu', 'joulukuu'],
    dayNames: ['sunnuntai', 'maanantai', 'tiistai', 'keskiviikko', 'torstai', 'perjantai', 'lauantai'],
    shortDayNames: ['su', 'ma', 'ti', 'ke', 'to', 'pe', 'la'],
    yearsLabel: function yearsLabel(years) {
      _newArrowCheck(this, _this$1);

      return years + ' ' + (years === 1 ? 'vuosi' : 'vuotta');
    }.bind(undefined),
    monthsLabel: function monthsLabel(months) {
      _newArrowCheck(this, _this$1);

      return months + ' ' + (months === 1 ? 'kuukausi' : 'kuukautta');
    }.bind(undefined),
    daysLabel: function daysLabel(days) {
      _newArrowCheck(this, _this$1);

      return days + ' ' + (days === 1 ? 'päivä' : 'päivää');
    }.bind(undefined),
    hoursLabel: function hoursLabel(hours, minutes) {
      _newArrowCheck(this, _this$1);

      var hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes).replace('.', ',');
      return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'tunti' : 'tuntia');
    }.bind(undefined),
    clearRangeLabel: 'Poista valinta',
    clearDateLabel: 'Poista valinta',
    shortDateFormat: 'j.n.Y',
    weekDateFormat: 'D j.n.Y',
    dateTimeFormat: 'D j.n.Y k\\lo G:i',
    firstWeekday: DateTime.MONDAY,
    holidays: holidays
  };

  var _this$2 = undefined;
  var EN = {
    id: 'EN',
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    yearsLabel: function yearsLabel(years) {
      _newArrowCheck(this, _this$2);

      return years + ' ' + (years === 1 ? 'Year' : 'Years');
    }.bind(undefined),
    monthsLabel: function monthsLabel(months) {
      _newArrowCheck(this, _this$2);

      return months + ' ' + (months === 1 ? 'Months' : 'Months');
    }.bind(undefined),
    daysLabel: function daysLabel(days) {
      _newArrowCheck(this, _this$2);

      return days + ' ' + (days === 1 ? 'Day' : 'Days');
    }.bind(undefined),
    hoursLabel: function hoursLabel(hours, minutes) {
      _newArrowCheck(this, _this$2);

      var hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes);
      return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Hour' : 'Hours');
    }.bind(undefined),
    clearRangeLabel: 'Clear Range',
    clearDateLabel: 'Clear Date',
    shortDateFormat: 'n/j/Y',
    weekDateFormat: 'D n/j/Y',
    dateTimeFormat: 'D n/j/Y G:i',
    firstWeekday: DateTime.SUNDAY,
    holidays: {}
  };

  var _this$3 = undefined;
  var AU = {
    id: 'AU',
    monthNames: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    shortDayNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    yearsLabel: function yearsLabel(years) {
      _newArrowCheck(this, _this$3);

      return years + ' ' + (years === 1 ? 'Year' : 'Years');
    }.bind(undefined),
    monthsLabel: function monthsLabel(months) {
      _newArrowCheck(this, _this$3);

      return months + ' ' + (months === 1 ? 'Months' : 'Months');
    }.bind(undefined),
    daysLabel: function daysLabel(days) {
      _newArrowCheck(this, _this$3);

      return days + ' ' + (days === 1 ? 'Day' : 'Days');
    }.bind(undefined),
    hoursLabel: function hoursLabel(hours, minutes) {
      _newArrowCheck(this, _this$3);

      var hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes);
      return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Hour' : 'Hours');
    }.bind(undefined),
    clearRangeLabel: 'Clear Range',
    clearDateLabel: 'Clear Date',
    shortDateFormat: 'j/n/Y',
    weekDateFormat: 'D j/n/Y',
    dateTimeFormat: 'D j/n/Y G:i',
    firstWeekday: DateTime.SUNDAY,
    holidays: {}
  };

  var _this$4 = undefined;
  var ET = {
    id: 'ET',
    monthNames: ['Jaanuar', 'Veebruar', 'Märts', 'Aprill', 'Mai', 'Juuni', 'Juuli', 'August', 'September', 'Oktoober', 'November', 'Detsember'],
    dayNames: ['Pühapäev', 'Esmaspäev', 'Teisipäev', 'Kolmapäev', 'Neljapäev', 'Reede', 'Laupäev'],
    shortDayNames: ['P', 'E', 'T', 'K', 'N', 'R', 'L'],
    yearsLabel: function yearsLabel(years) {
      _newArrowCheck(this, _this$4);

      return years + ' ' + (years === 1 ? 'Aasta' : 'Aastat');
    }.bind(undefined),
    monthsLabel: function monthsLabel(months) {
      _newArrowCheck(this, _this$4);

      return months + ' ' + (months === 1 ? 'Kuu' : 'Kuud');
    }.bind(undefined),
    daysLabel: function daysLabel(days) {
      _newArrowCheck(this, _this$4);

      return days + ' ' + (days === 1 ? 'Päev' : 'Päeva');
    }.bind(undefined),
    hoursLabel: function hoursLabel(hours, minutes) {
      _newArrowCheck(this, _this$4);

      var hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes).replace('.', ',');
      return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Tund' : 'Tundi');
    }.bind(undefined),
    clearRangeLabel: 'TODO',
    clearDateLabel: 'TODO',
    shortDateFormat: 'j.n.Y',
    weekDateFormat: 'D j.n.Y',
    dateTimeFormat: 'D j.n.Y G:i',
    firstWeekday: DateTime.MONDAY,
    holidays: {}
  };

  var _this$5 = undefined;
  /**
   * For example:
   *   1 год
   *   2 года, 3 года, 4 года
   *   5 лет, 6 лет … 11 лет, 12 лет … 20 лет
   *   21 год, 31 год
   *   22 года, 32 года
   * @param {number} number
   * @param {Array} words
   * @return {string}
   */

  function pluralize(number, words) {
    var magnitude = number % 100;
    var pluralWord = '';

    if (magnitude > 10 && magnitude < 20 || number === 0) {
      pluralWord = words[2];
    } else {
      switch (Math.abs(number % 10)) {
        case 1:
          pluralWord = words[0];
          break;

        case 2:
        case 3:
        case 4:
          pluralWord = words[1];
          break;

        default:
          pluralWord = words[2];
          break;
      }
    }

    return [number, pluralWord].join(' ');
  }

  var RU = {
    id: 'RU',
    monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
    dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
    shortDayNames: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
    yearsLabel: function yearsLabel(years) {
      _newArrowCheck(this, _this$5);

      return pluralize(years, ['Год', 'Года', 'Лет']);
    }.bind(undefined),
    monthsLabel: function monthsLabel(months) {
      _newArrowCheck(this, _this$5);

      return pluralize(months, ['Месяц', 'Месяца', 'Месяцев']);
    }.bind(undefined),
    daysLabel: function daysLabel(days) {
      _newArrowCheck(this, _this$5);

      return pluralize(days, ['День', 'Дня', 'Дней']);
    }.bind(undefined),
    hoursLabel: function hoursLabel(hours, minutes) {
      _newArrowCheck(this, _this$5);

      var hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes).replace('.', ',');
      /*
       * It's weird to say like this but correct pronounce is:
       * 1,2  = '1 целая две десятых часа'
       * 0,1  = '1 десятая часа'
       * 0,06 = '6 сотых часа'
       * 2,05 = '2 целых пять сотых часа'
       * 3,12 = '3 целых двенадцать сотых часа'
       * 4,29 = '4 целых 29 сотых часа'
       */

      return hoursAndMinutes + ' Часа';
    }.bind(undefined),
    learRangeLabel: 'Очистить диапазон',
    clearDateLabel: 'Очистить дату',
    shortDateFormat: 'j.n.Y',
    weekDateFormat: 'D j.n.Y',
    dateTimeFormat: 'D j.n.Y G:i',
    firstWeekday: DateTime.MONDAY,
    holidays: {}
  };

  var _this$6 = undefined;
  var SV = {
    id: 'SV',
    monthNames: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
    dayNames: ['Söndag', 'Måndag', 'Tisdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lördag'],
    shortDayNames: ['Sö', 'Må', 'Ti', 'On', 'To', 'Fr', 'Lö'],
    yearsLabel: function yearsLabel(years) {
      _newArrowCheck(this, _this$6);

      return years + ' ' + (years === 1 ? 'År' : 'År');
    }.bind(undefined),
    monthsLabel: function monthsLabel(months) {
      _newArrowCheck(this, _this$6);

      return months + ' ' + (months === 1 ? 'Månad' : 'Månader');
    }.bind(undefined),
    daysLabel: function daysLabel(days) {
      _newArrowCheck(this, _this$6);

      return days + ' ' + (days === 1 ? 'Dag' : 'Dagar');
    }.bind(undefined),
    hoursLabel: function hoursLabel(hours, minutes) {
      _newArrowCheck(this, _this$6);

      var hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes).replace('.', ',');
      return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Minut' : 'Minuter');
    }.bind(undefined),
    clearRangeLabel: 'TODO',
    clearDateLabel: 'TODO',
    shortDateFormat: 'j.n.Y',
    weekDateFormat: 'D j.n.Y',
    dateTimeFormat: 'D j.n.Y G:i',
    firstWeekday: DateTime.MONDAY,
    holidays: {}
  };

  var _this$7 = undefined;
  var LV = {
    id: 'LV',
    monthNames: ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', ' Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'],
    dayNames: ['Svētdiena', 'Pirmdiena', 'Otrdiena', 'Trešdiena', 'Ceturtdiena', 'Piektdiena', 'Sestdiena'],
    shortDayNames: ['Sv', 'P', 'O', 'T', 'C', 'Pk', 'S'],
    yearsLabel: function yearsLabel(years) {
      _newArrowCheck(this, _this$7);

      return years + ' ' + (years === 1 ? 'G' : 'G');
    }.bind(undefined),
    monthsLabel: function monthsLabel(months) {
      _newArrowCheck(this, _this$7);

      return months + ' ' + (months === 1 ? 'Mēnesī' : 'Mēnešiem');
    }.bind(undefined),
    daysLabel: function daysLabel(days) {
      _newArrowCheck(this, _this$7);

      return days + ' ' + (days === 1 ? 'Diena' : 'Dienas');
    }.bind(undefined),
    hoursLabel: function hoursLabel(hours, minutes) {
      _newArrowCheck(this, _this$7);

      var hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes);
      return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Stundas' : 'Minūtes');
    }.bind(undefined),
    clearRangeLabel: 'TODO',
    clearDateLabel: 'TODO',
    shortDateFormat: 'j.n.Y',
    weekDateFormat: 'D j.n.Y',
    dateTimeFormat: 'D j.n.Y G:i',
    firstWeekday: DateTime.MONDAY,
    holidays: {}
  };

  var _this$8 = undefined;
  var FR = {
    id: 'FR',
    monthNames: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
    dayNames: ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'],
    shortDayNames: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
    yearsLabel: function yearsLabel(years) {
      _newArrowCheck(this, _this$8);

      return years + ' ' + (years === 1 ? 'Année' : 'Années');
    }.bind(undefined),
    monthsLabel: function monthsLabel(months) {
      _newArrowCheck(this, _this$8);

      return months + ' ' + (months === 1 ? 'Mois' : 'Moiss');
    }.bind(undefined),
    daysLabel: function daysLabel(days) {
      _newArrowCheck(this, _this$8);

      return days + ' ' + (days === 1 ? 'Jour' : 'Jours');
    }.bind(undefined),
    hoursLabel: function hoursLabel(hours, minutes) {
      _newArrowCheck(this, _this$8);

      var hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes);
      return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Heure' : 'Heures');
    }.bind(undefined),
    clearRangeLabel: 'Effacer la sélection',
    clearDateLabel: 'Effacer la date',
    shortDateFormat: 'j/n/Y',
    weekDateFormat: 'D j/n/Y',
    dateTimeFormat: 'D j/n/Y G:i',
    firstWeekday: DateTime.MONDAY,
    holidays: {}
  };

  var _this$9 = undefined;
  var DE = {
    id: 'DE',
    monthNames: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
    dayNames: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
    shortDayNames: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
    yearsLabel: function yearsLabel(years) {
      _newArrowCheck(this, _this$9);

      return years + ' ' + 'Jahr';
    }.bind(undefined),
    monthsLabel: function monthsLabel(months) {
      _newArrowCheck(this, _this$9);

      return months + ' ' + (months === 1 ? 'Monat' : 'Months');
    }.bind(undefined),
    daysLabel: function daysLabel(days) {
      _newArrowCheck(this, _this$9);

      return days + ' ' + (days === 1 ? 'Tag' : 'Tage');
    }.bind(undefined),
    hoursLabel: function hoursLabel(hours, minutes) {
      _newArrowCheck(this, _this$9);

      var hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes);
      return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? 'Stunde' : 'Stunden');
    }.bind(undefined),
    clearRangeLabel: 'Auswahl löschen',
    clearDateLabel: 'Auswahl löschen',
    shortDateFormat: 'j.n.Y',
    weekDateFormat: 'D j.n.Y',
    dateTimeFormat: 'D j.n.Y G:i',
    firstWeekday: DateTime.MONDAY,
    holidays: {}
  };

  var _this$a = undefined;
  var CN = {
    id: 'AU',
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    shortDayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    yearsLabel: function yearsLabel(years) {
      _newArrowCheck(this, _this$a);

      return years + ' ' + (years === 1 ? '年' : '年');
    }.bind(undefined),
    monthsLabel: function monthsLabel(months) {
      _newArrowCheck(this, _this$a);

      return months + ' ' + (months === 1 ? '月' : '月');
    }.bind(undefined),
    daysLabel: function daysLabel(days) {
      _newArrowCheck(this, _this$a);

      return days + ' ' + (days === 1 ? '日' : '日');
    }.bind(undefined),
    hoursLabel: function hoursLabel(hours, minutes) {
      _newArrowCheck(this, _this$a);

      var hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes);
      return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? '小时' : '小时');
    }.bind(undefined),
    clearRangeLabel: '范围',
    clearDateLabel: '日期',
    shortDateFormat: 'Y年m月d日',
    weekDateFormat: 'Y年m月d日 D',
    dateTimeFormat: 'Y年m月d日 H时i分s秒',
    firstWeekday: DateTime.MONDAY,
    holidays: {}
  };

  var DateLocale = {
    FI: FI,
    EN: EN,
    AU: AU,
    ET: ET,
    RU: RU,
    SV: SV,
    LV: LV,
    FR: FR,
    DE: DE,
    CN: CN
  };

  var DateParse =
  /*#__PURE__*/
  function () {
    function DateParse() {
      _classCallCheck(this, DateParse);
    }

    _createClass(DateParse, null, [{
      key: "parseDate",
      value: function parseDate(input, format) {
        var values = input.match(getOrCreateParseRegexp());
        return values ? matchesToDateTime(values) : null;

        function matchesToDateTime(values) {
          var day = matchesToObject(values);
          return DateTime.fromDate(day.Y, day.m ? day.m : day.n, day.d ? day.d : day.j);
        }

        function matchesToObject(matchValues) {
          var day = {};
          var keys = format.replace(/[^djmnY]/g, '').split('');

          for (var i = 0; i < keys.length; i++) {
            day[keys[i]] = +matchValues[i + 1];
          }

          return day;
        }

        function getOrCreateParseRegexp() {
          if (DateParse.parseRegexes[format] === undefined) {
            DateParse.parseRegexes[format] = new RegExp(format.replace(/[djmnY]/g, '(\\d+)').replace(/\./g, '\\.'));
          }

          return DateParse.parseRegexes[format];
        }
      }
    }, {
      key: "parseTime",
      value: function parseTime(timeStr) {
        var splittedTime = splitTime(timeStr.replace(/:|,/i, '.'));
        var time = [+splittedTime[0], +splittedTime[1]];
        return isHour(time[0]) && isMinute(time[1]) ? time : null;

        function splitTime(timeStr) {
          if (timeStr.indexOf('.') !== -1) {
            return timeStr.split('.');
          }

          var splitTimes = {
            4: [timeStr.slice(0, 2), timeStr.slice(2, 4)],
            3: [timeStr.slice(0, 1), timeStr.slice(1, 3)],
            2: [timeStr, 0]
          };
          return splitTimes[timeStr.length] || [-1, -1];
        }

        function isMinute(minutes) {
          return !isNaN(minutes) && minutes >= 0 && minutes <= 59;
        }

        function isHour(hours) {
          return !isNaN(hours) && hours >= 0 && hours <= 23;
        }
      }
    }, {
      key: "parse",
      value: function parse(input, locale) {
        if (typeof input === 'string') {
          if (input === 'today') {
            return DateTime.today();
          }

          var format = locale ? locale.shortDateFormat : DateParse.defaultFormat;
          var date = DateParse.parseDate(input, format);
          return date ? date : new DateTime(new Date(input));
        }

        throw new Error("DateParse only accepts strings");
      }
    }]);

    return DateParse;
  }();

  DateParse.parseRegexes = [];
  DateParse.defaultFormat = 'n/j/Y';

  var DateRange =
  /*#__PURE__*/
  function () {
    function DateRange(date1, date2) {
      _classCallCheck(this, DateRange);

      if (!date1 || !date2) {
        throw 'two dates must be specified, date1=' + date1 + ', date2=' + date2;
      }

      this.start = date1.compareTo(date2) > 0 ? date2 : date1;
      this.end = date1.compareTo(date2) > 0 ? date1 : date2;
      this._days = 0;
      this._hours = 0;
      this._minutes = 0;
      this._valid = true;
    }

    _createClass(DateRange, [{
      key: "_setDaysHoursAndMinutes",
      value: function _setDaysHoursAndMinutes() {
        if (this._hasTimes) {
          var ms = parseInt(this.end.getTime() - this.start.getTime(), 10);
          this._days = parseInt(ms / DateTime.DAY, 10);
          ms = ms - this._days * DateTime.DAY;
          this._hours = parseInt(ms / DateTime.HOUR, 10);
          ms = ms - this._hours * DateTime.HOUR;
          this._minutes = parseInt(ms / DateTime.MINUTE, 10);
        }
      }
    }, {
      key: "_dateWithTime",
      value: function _dateWithTime(dateWithoutTime, parsedTime) {
        return dateWithoutTime.withTime(parsedTime[0], parsedTime[1]);
      }
    }, {
      key: "hours",
      value: function hours() {
        return this._hours;
      }
    }, {
      key: "minutes",
      value: function minutes() {
        return this._minutes;
      }
    }, {
      key: "hasDate",
      value: function hasDate(date) {
        return date.isBetweenDates(this.start, this.end);
      }
    }, {
      key: "isValid",
      value: function isValid() {
        return this._valid && this.end.getTime() - this.start.getTime() >= 0;
      }
    }, {
      key: "days",
      value: function days() {
        return this._hasTimes ? this._days : Math.round(this.start.distanceInDays(this.end) + 1);
      }
    }, {
      key: "shiftDays",
      value: function shiftDays(days) {
        return new DateRange(this.start.plusDays(days), this.end.plusDays(days));
      }
    }, {
      key: "expandTo",
      value: function expandTo(date) {
        var newStart = this.start.clone();
        var newEnd = this.end.clone();
        if (date.compareTo(this.start) < 0) newStart = date;else if (date.compareTo(this.end) > 0) newEnd = date;
        return new DateRange(newStart, newEnd);
      }
    }, {
      key: "expandDaysTo",
      value: function expandDaysTo(days) {
        return new DateRange(this.start, this.start.plusDays(days - 1));
      }
    }, {
      key: "hasValidSize",
      value: function hasValidSize(minimumDays) {
        return minimumDays < 0 || this.days() >= minimumDays;
      }
    }, {
      key: "hasValidSizeAndEndsOnWorkWeek",
      value: function hasValidSizeAndEndsOnWorkWeek(minimumDays) {
        return this.hasValidSize(minimumDays) && this.hasEndsOnWeekend();
      }
    }, {
      key: "and",
      value: function and(that) {
        var latestStart = this.start.compareTo(that.start) > 0 ? this.start : that.start;
        var earliestEnd = this.end.compareTo(that.end) > 0 ? that.end : this.end;
        return latestStart.compareTo(earliestEnd) < 0 ? new DateRange(latestStart, earliestEnd) : DateRange.emptyRange();
      }
    }, {
      key: "isInside",
      value: function isInside(outer) {
        return this.start.compareTo(outer.start) >= 0 && this.end.compareTo(outer.end) <= 0;
      }
    }, {
      key: "hasEndsOnWeekend",
      value: function hasEndsOnWeekend() {
        return this.start.isWeekend() || this.end.isWeekend();
      }
    }, {
      key: "withTimes",
      value: function withTimes(startTimeStr, endTimeStr) {
        var parsedStartTime = DateParse.parseTime(startTimeStr);
        var parsedEndTime = DateParse.parseTime(endTimeStr);
        var rangeWithTimes = this.clone();

        if (parsedStartTime && parsedEndTime) {
          rangeWithTimes._valid = true;
          rangeWithTimes._hasTimes = true;
          rangeWithTimes.start = this._dateWithTime(this.start, parsedStartTime);
          rangeWithTimes.end = this._dateWithTime(this.end, parsedEndTime);

          rangeWithTimes._setDaysHoursAndMinutes();
        } else {
          rangeWithTimes._valid = false;
        }

        return rangeWithTimes;
      }
    }, {
      key: "clone",
      value: function clone() {
        return new DateRange(this.start, this.end);
      }
    }, {
      key: "toString",
      value: function toString() {
        return ['DateRange:', this.start.toString(), '-', this.end.toString(), this._days, 'days', this._hours, 'hours', this._minutes, 'minutes', this._valid ? 'valid' : 'invalid'].join(' ');
      }
    }, {
      key: "isPermittedRange",
      value: function isPermittedRange(minimumSize, disableWeekends, outerRange) {
        return this.hasValidSize(minimumSize) && !(disableWeekends && this.hasEndsOnWeekend()) && this.isInside(outerRange);
      }
    }, {
      key: "shiftInside",
      value: function shiftInside(outerRange) {
        if (this.days() > outerRange.days()) {
          return DateRange.emptyRange();
        }

        var distanceToOuterRangeStart = this.start.distanceInDays(outerRange.start);
        var distanceToOuterRangeEnd = this.end.distanceInDays(outerRange.end);

        if (distanceToOuterRangeStart > 0) {
          return this.shiftDays(distanceToOuterRangeStart);
        }

        if (distanceToOuterRangeEnd < 0) {
          return this.shiftDays(distanceToOuterRangeEnd);
        }

        return this;
      }
    }, {
      key: "hasSelection",
      value: function hasSelection() {
        return this.days() > 0;
      }
    }], [{
      key: "emptyRange",
      value: function emptyRange() {
        function NullDateRange() {
          var _this = this;

          this.start = null;
          this.end = null;

          this.days = function () {
            _newArrowCheck(this, _this);

            return 0;
          }.bind(this);

          this.shiftDays = function () {
            _newArrowCheck(this, _this);
          }.bind(this);

          this.hasDate = function () {
            _newArrowCheck(this, _this);

            return false;
          }.bind(this);

          this.clone = function () {
            _newArrowCheck(this, _this);

            return DateRange.emptyRange();
          }.bind(this);

          this.expandDaysTo = function () {
            return this;
          };

          this.hasEndsOnWeekend = function () {
            _newArrowCheck(this, _this);

            return false;
          }.bind(this);

          this.isPermittedRange = function () {
            _newArrowCheck(this, _this);

            return true;
          }.bind(this);

          this.hasSelection = function () {
            _newArrowCheck(this, _this);

            return false;
          }.bind(this);
        }

        return new NullDateRange();
      }
    }, {
      key: "rangeWithMinimumSize",
      value: function rangeWithMinimumSize(oldRange, minimumSize, disableWeekends, outerRange) {
        if (isTooSmallSelection()) {
          var newRange = oldRange.expandDaysTo(minimumSize);

          if (disableWeekends && newRange.hasEndsOnWeekend()) {
            var shiftedDays = newRange.shiftDays(delta(newRange.end.getDay())).shiftInside(outerRange);

            while (!shiftedDays.isPermittedRange(minimumSize, disableWeekends, outerRange) || shiftedDays.end.compareTo(outerRange.end) > 0) {
              if (!shiftedDays.isPermittedRange(minimumSize, false, outerRange)) {
                return DateRange.emptyRange();
              }

              shiftedDays = shiftedDays.shiftDays(1);
            }

            newRange = shiftedDays;
          }

          if (!newRange.isPermittedRange(minimumSize, false, outerRange)) {
            return DateRange.emptyRange();
          }

          return newRange;
        }

        return oldRange;

        function isTooSmallSelection() {
          return minimumSize && oldRange.days() <= minimumSize;
        }

        function delta(x) {
          return -((x + 1) % 7 + 1);
        }
      }
    }]);

    return DateRange;
  }();

  var _this$b = undefined;

  var Duration = function Duration(durationMs) {
    this.durationMs = durationMs;
  };

  Duration.MS = 1;
  Duration.SECOND = 1000;
  Duration.MIN = 60 * Duration.SECOND;
  Duration.HOUR = 60 * Duration.MIN;
  Duration.DAY = 24 * Duration.HOUR;

  Duration.fromMS = function (milliSeconds) {
    _newArrowCheck(this, _this$b);

    return new Duration(milliSeconds);
  }.bind(undefined);

  Duration.fromSeconds = function (seconds) {
    _newArrowCheck(this, _this$b);

    return Duration.fromMS(seconds * Duration.SECOND);
  }.bind(undefined);

  Duration.fromMinutes = function (minutes) {
    _newArrowCheck(this, _this$b);

    return Duration.fromMS(minutes * Duration.MIN);
  }.bind(undefined);

  Duration.fromHours = function (hours) {
    _newArrowCheck(this, _this$b);

    return Duration.fromMS(hours * Duration.HOUR);
  }.bind(undefined);

  Duration.fromDays = function (days) {
    _newArrowCheck(this, _this$b);

    return Duration.fromMS(days * Duration.DAY);
  }.bind(undefined);

  Duration.fromIsoTime = function (isoTime) {
    _newArrowCheck(this, _this$b);

    var parts = isoTime.split(':').map(Number);
    var hour = parts[0];
    var minutes = parts[1];
    var seconds = parts[2];
    var milliseconds = parts[3] || 0;
    return Duration.fromMS(hour * Duration.HOUR + minutes * Duration.MIN + seconds * Duration.SECOND + milliseconds);
  }.bind(undefined);

  Duration.prototype.toMS = function () {
    return this.durationMs;
  };

  Duration.prototype.asUnit = function (unit) {
    return Number(this.durationMs / unit);
  };

  exports.DateFormat = DateFormat;
  exports.DateLocale = DateLocale;
  exports.DateParse = DateParse;
  exports.DateRange = DateRange;
  exports.DateTime = DateTime;
  exports.Duration = Duration;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
