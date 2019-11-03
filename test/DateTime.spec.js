const DateTime = require('../src/DateTime');

describe('DateTime', () => {
  with (DateTime) {
    const dateWithMS = new Date(2010, 2, 3, 12, 45, 30);
    const dateWithNoMS = new Date(2010, 2, 3, 12, 45, 0);
    const dateTimeWithMS = new DateTime(dateWithMS);
    const dateTimeWithNoMS = new DateTime(dateWithNoMS);
    const leapYear = 2000;
    const normalYear = 2001;
    const leapYearMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const normalYearMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const yearSizes2000_2010 = [366, 365, 365, 365, 366, 365, 365, 365, 366, 365, 365];

    describe('Constructor', () => {
      const currentDate = new Date();
      currentDate.setMilliseconds(0)
      it('with empty arguments', () => {
        expect(new DateTime().withResetMS().getTime()).to.toEqualRoughly(currentDate.getTime(), 1000)
      })

      it('with date', () => {
        expect(new DateTime(new Date(2012, 10, 3, 0, 0, 0)).toISOString()).to.equal('2012-11-03T00:00:00')
      })

      it('throws errors on invalid values', () => {
        expect(() => {new DateTime('2012/11/3')}).to.throw('Argument must be a date object. 2012/11/3 was given')
      })
    })

    describe('Factory methods', () => {
      describe('fromIsoDate', () => {
        it('creates dateTime correctly from ISO date', () => {
          expect(fromIsoDate('2012-01-20').date).to.eql(fromDate(2012, 1, 20).date)
          expect(fromIsoDate('2012-01-20T13:35').date).to.eql(fromDate(2012, 1, 20).date)
        })

        it('thorws errors of invalid iso formats', () => {
          expectToThrow('2010-0101')
          expectToThrow('2010-01-01T')
          expectToThrow('2010-01-01T1012')
        })

        function expectToThrow(input) { expect(fromIsoDate.wrap(input)).to.throw(input + ' is not valid ISO Date (YYYY-MM-DD or YYYY-MM-DDTHH:MM)') }
      })

      describe('fromIsoDateTime', () => {
        it('creates dateTime correctly from ISO date time', () => {
          expect(fromIsoDateTime('2012-01-20T13:35').date).to.eql(fromDateTime(2012, 1, 20, 13, 35).date)
        })

        it('thorws errors of invalid iso formats', () => {
          expectToThrow('2012-01-20')
          expectToThrow('2012-01-20T')
          expectToThrow('2012-01-20T1020')
        })

        function expectToThrow(input) { expect(fromIsoDateTime.wrap(input)).to.throw(input + ' is not valid ISO Date (YYYY-MM-DDTHH:MM)') }
      })

      describe('fromMillis', () => {
        it('returns DateTime with given milliseconds', () => {
          const ms = new Date().getTime();
          expect(fromMillis(ms).getTime()).to.be.closeTo(ms, 1000)
        })
      })

      describe('now', () => {
        it('returns current time', () => {
          const date = new Date();
          date.setMilliseconds(0)
          expect(now().withResetMS().getTime()).to.be.closeTo(date.getTime(), 1000)
          expect(now().getTime()).to.be.closeTo(now().getTime(), 1000)
        })
      })

      describe('fromDateTime', () => {
        it('returns new date with given values', () => {
          expect(fromDateTime(2010, 3, 3, 12, 45).date).to.eql(dateTimeWithNoMS.date)
        })

        it('throws errors on invalid values', () => {
          expect(fromDateTime.wrap(2010, 1, 1, 25, 0)).to.throw('Invalid Date: 2010-1-1 25:0:0')
          expect(fromDateTime.wrap(2010, 1, 1, 23, 60)).to.throw('Invalid Date: 2010-1-1 23:60:0')
        })
      })

      describe('fromDate', () => {
        it('returns new date with given values', () => {
          expect(fromDate(2010, 3, 3).date).to.eql(fromDate(2010, 3, 3).date)
        })

        it('throws errors on invalid values', () => {
          expect(fromDate.wrap(2010, 'lol', 3)).to.throw('Invalid Date: 2010-NaN-3 0:0:0')
          expect(fromDate.wrap(2010, 14, 3)).to.throw('Invalid Date: 2010-14-3 0:0:0')
          expect(fromDate.wrap(2010, 0, 3)).to.throw('Invalid Date: 2010-0-3 0:0:0')
          expect(fromDate.wrap(2010, 4, 32)).to.throw('Invalid Date: 2010-4-32 0:0:0')
        })
      })
      describe('fromDateObject', () => {
        it('returns new date from given Date object', () => {
          expect(fromDateObject(dateWithNoMS).date).to.eql(fromDateTime(2010, 3, 3, 12, 45).date)
        })
      })
    })

    describe('Constants', () => {
      describe('Units', () => {
        it('have correct values', () => {
          expect(SECOND).to.equal(1000)
          expect(MINUTE).to.equal(60000)
          expect(HOUR).to.equal(3600000)
          expect(WEEK).to.equal(604800000)
        })
      })
      describe('Weekdays', () => {
        it('have correct indexes', () => {
          expect(SUNDAY).to.equal(0)
          expect(MONDAY).to.equal(1)
          expect(TUESDAY).to.equal(2)
          expect(WEDNESDAY).to.equal(3)
          expect(THURSDAY).to.equal(4)
          expect(FRIDAY).to.equal(5)
          expect(SATURDAY).to.equal(6)
        })
      })
    })

    describe('Instance methods', () => {
      describe('for wrapping Date', () => {
        [
          {desc: 'unix time', func: 'getTime'},
          {desc: 'full year', func: 'getFullYear'},
          {desc: 'dateWithMS', func: 'getDate'},
          {desc: 'weekday', func: 'getDay'},
          {desc: 'hours', func: 'getHours'},
          {desc: 'minutes', func: 'getMinutes'},
          {desc: 'seconds', func: 'getSeconds'},
          {desc: 'milliseconds', func: 'getMilliseconds'}
        ].forEach((spec, _index) => {
          it('returns ' + spec.desc, () => {
            expect(dateTimeWithMS[spec.func]()).to.equal(dateWithMS[spec.func]())
          })
        })
      })

      describe('withTime', () => {
        it('should update only time and reset seconds and milliseconds', () => {
          expect(dateTimeWithMS.withTime(10, 30).date).to.eql(fromDateTime(2010, 3, 3, 10, 30).date)
          expect(dateTimeWithMS.withTime('11:30').date).to.eql(fromDateTime(2010, 3, 3, 11, 30).date)
        })
      })

      describe('getDaysInMonth', () => {
        it('lists days of given month', () => {
          expect(sequence(1, 12).map(month => fromDate(leapYear, month, 1).getDaysInMonth())).to.eql(leapYearMonths)
          expect(sequence(1, 12).map(month => fromDate(normalYear, month, 1).getDaysInMonth())).to.eql(normalYearMonths)
        })
      })

      describe('getDayInYear', () => {
        it('returns number between 0-365 depending on distance of 1st jan of same year', () => {
          expect(fromDate(2010, 1, 1).getDayInYear()).to.equal(1)
          expect(sequence(2000, 2010).map(year => fromDate(year, 12, 31).getDayInYear())).to.eql(yearSizes2000_2010)
        })
      })

      describe('toIsoString', () => {
        it('returns ISO string with local times ', () => {
          expect(fromDateTime(2010, 3, 5, 4, 0).toISOString()).to.equal('2010-03-05T04:00:00')
          expect(fromDateTime(2010, 12, 25, 14, 35).toISOString()).to.equal('2010-12-25T14:35:00')
          const isoDateTime = '2010-12-25T14:35:05';
          expect(fromIsoDateTime(isoDateTime).toISOString()).to.equal(isoDateTime)
          expect(fromIsoDateTime(now().withResetMS().toISOString()).date).to.eql(now().withResetMS().date)
        })
      })

      describe('toIsoDateString', () => {
        it('returns ISO string without times ', () => {
          expect(fromDateTime(2010, 3, 5, 4, 0).toISODateString()).to.equal('2010-03-05')
          expect(fromDateTime(2010, 12, 25, 14, 35).toISODateString()).to.equal('2010-12-25')
          const isoDateTime = '2010-12-25T14:35:05';
          expect(fromIsoDateTime(isoDateTime).toISOString()).to.equal(isoDateTime)
          expect(fromIsoDateTime(now().withResetMS().toISOString()).date).to.eql(now().withResetMS().date)
        })
      })

      describe('plusDay / minusDays s vs distanceInDays', () => {
        it('takes day light saving into account (test passes at least in Finland)', () => {
          const winter1 = fromDateTime(2013, 3, 29, 10, 0);
          const winter2 = fromDateTime(2013, 3, 30, 10, 0);
          expect(winter2.getTime() - winter1.getTime()).to.equal(DAY)
          const summer1 = fromDateTime(2013, 3, 31, 10, 0);
          expect(summer1.getTime() - winter2.getTime()).to.equal(DAY - HOUR)
          const summer2 = fromDateTime(2013, 4, 1, 10, 0);
          expect(summer2.getTime() - summer1.getTime()).to.equal(DAY)
          const summer3 = fromDateTime(2013, 10, 1, 10, 0);
          expect(summer3.getTime() - summer2.getTime()).to.equal(summer2.distanceInDays(summer3) * DAY)
        })

        it('returns date away of given amount of days', () => {
          for (var days = 0; days < 400; days++) {
            expect(now().distanceInDays(now().plusDays(days))).to.equal(days)
          }
          for (days = 0; days < 400; days++) {
            expect(now().minusDays(days).distanceInDays(now())).to.equal(days)
          }
        })
      })

      describe('plusMinutes', () => {
        it('adds minutes to given date', () => {
          const original = fromDateTime(2014, 1, 1, 10, 5);
          expect(original.plusMinutes(10).toISOString()).to.equal('2014-01-01T10:15:00')
          expect(original.plusMinutes(80).toISOString()).to.equal('2014-01-01T11:25:00')
          expect(original.minusMinutes(20).toISOString()).to.equal('2014-01-01T09:45:00')
        })
      })

      describe('getWeekInYear', () => {
        expect(sequence(2000, 2010).map(firstWeekOfYear('ISO'))).to.eql([52, 1, 1, 1, 1, 53, 52, 1, 1, 1, 53])
        expect(sequence(2000, 2010).map(firstWeekOfYear('US'))).to.eql([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1])

        function firstWeekOfYear(standard) { return year => fromDate(year, 1, 1).getWeekInYear(standard)}
      })

      describe('isToday', () => {
        it('returns always true for today', () => {
          expect(now().isToday()).to.be.true
          expect(now().plusDays(1).isToday()).to.be.false
        })

        it('returns false for tomorrow and yesterday', () => {
          expect(now().plusDays(1).isToday()).to.be.false
          expect(now().minusDays(1).isToday()).to.be.false
        })
      })

      describe('clone', () => {
        it('has no references to cloned object', () => {
          const original = fromDate(2013, 1, 1);
          const cloned = original.clone();
          cloned.date.setYear(2000)
          expect(original.getFullYear()).to.equal(2013)
        })
      })

      describe('withResetMS', () => {
        it('resets milliseconds', () => {
          expect(fromDateObject(new Date(2010, 0, 1, 12, 30, 59, 30)).withResetMS().date).to.eql(fromDateObject(new Date(2010, 0, 1, 12, 30, 59, 0)).date)
        })
      })

      describe('compareTo', () => {
        it('returns positive, zero or negative value', () => {
          expect(dateTimeWithMS.compareTo(dateTimeWithNoMS)).to.be.above(0)
          expect(dateTimeWithNoMS.compareTo(dateTimeWithMS)).to.be.below(0)
          expect(dateTimeWithMS.compareTo(dateTimeWithMS)).to.equal(0)
        })
      })

      describe('isOddMonth', () => {
        it('returns true for odd months', () => {
          expect(dateTimeWithNoMS.isOddMonth()).to.be.false
          expect(dateTimeWithNoMS.plusDays(35).isOddMonth()).to.be.true
        })
      })

      describe('equalsOnlyDate', () => {
        it('returns true when date is same discarding time information', () => {
          expect(dateTimeWithMS.equalsOnlyDate(dateTimeWithNoMS)).to.be.true
          expect(dateTimeWithMS.equalsOnlyDate(dateTimeWithNoMS.withTime(10, 30))).to.be.true
          expect(dateTimeWithMS.plusDays(1).equalsOnlyDate(dateTimeWithNoMS)).to.equal(false)
          expect(dateTimeWithMS.equalsOnlyDate(dateTimeWithNoMS.plusDays(1))).to.equal(false)
        })
      })

      describe('isBetweenDates', () => {
        it('returns true when date is between given dates', () => {
          expect(fromDate(2010, 1, 5).isBetweenDates(fromDate(2010, 1, 4), fromDate(2010, 1, 6))).to.be.true
          expect(fromDate(2010, 1, 5).isBetweenDates(fromDate(2010, 1, 5), fromDate(2010, 1, 5))).to.be.true
          expect(fromDate(2010, 1, 5).isBetweenDates(fromDate(2010, 1, 3), fromDate(2010, 1, 4))).to.be.false
          expect(fromDate(2010, 1, 5).isBetweenDates(fromDate(2010, 1, 6), fromDate(2010, 1, 7))).to.be.false
          expect(fromDate(2010, 1, 5).isBetweenDates.wrap(fromDate(2010, 1, 6), fromDate(2010, 1, 4))).to.throw("start date can't be after end date")
        })
      })

      describe('firstDateOfMonth', () => {
        it('returns first date of month', () => {
          expect(dateTimeWithNoMS.firstDateOfMonth().date).to.eql(fromDate(2010, 3, 1).date)
          expect(fromDate(2010, 3, 1).firstDateOfMonth().date).to.eql(fromDate(2010, 3, 1).date)
        })
      })

      describe('lastDateOfMonth', () => {
        it('returns last date of month', () => {
          expect(dateTimeWithNoMS.lastDateOfMonth().date).to.eql(fromDate(2010, 3, 31).date)
          expect(fromDate(2010, 3, 31).lastDateOfMonth().date).to.eql(fromDate(2010, 3, 31).date)
        })
      })

      describe('withWeekDay', () => {
        it('returns date with given week day from same week (sunday is the first date of week)', () => {
          const saturday = fromDate(2010, 1, 9);
          expect(saturday.withWeekday(SUNDAY).date).to.eql(fromDate(2010, 1, 3).date)
          expect(saturday.withWeekday(MONDAY).date).to.eql(fromDate(2010, 1, 4).date)
          expect(saturday.withWeekday(SATURDAY).date).to.eql(fromDate(2010, 1, 9).date)
          const sunday = fromDate(2010, 1, 10);
          expect(sunday.getDay()).to.equal(SUNDAY)
          expect(sunday.withWeekday(MONDAY).date).to.eql(fromDate(2010, 1, 11).date)
          expect(sunday.withWeekday(TUESDAY).date).to.eql(fromDate(2010, 1, 12).date)
          const tuesday = sunday.plusDays(2);
          expect(tuesday.withWeekday(MONDAY).date).to.eql(fromDate(2010, 1, 11).date)
          expect(tuesday.withWeekday(TUESDAY).date).to.eql(fromDate(2010, 1, 12).date)
        })
      })

      describe('getOnlyDate', () => {
        it('return new DateTime with midnight times', () => {
          expect(fromDateTime(2010, 1, 1, 10, 30).getOnlyDate().date).to.eql(fromDateTime(2010, 1, 1, 0, 0).date)
        })
      })

      describe('isWeekend', () => {
        it('returns true for saturday and sunday', () => {
          expect(dateTimeWithNoMS.withWeekday(SATURDAY).isWeekend()).to.be.true
          expect(dateTimeWithNoMS.withWeekday(SUNDAY).isWeekend()).to.be.true
          expect(dateTimeWithNoMS.withWeekday(MONDAY).isWeekend()).to.be.false
          expect(dateTimeWithNoMS.withWeekday(TUESDAY).isWeekend()).to.be.false
          expect(dateTimeWithNoMS.withWeekday(WEDNESDAY).isWeekend()).to.be.false
          expect(dateTimeWithNoMS.withWeekday(THURSDAY).isWeekend()).to.be.false
          expect(dateTimeWithNoMS.withWeekday(FRIDAY).isWeekend()).to.be.false
        })
      })

      describe('toString', () => {
        it('returns same as toISOString', () => {
          expect(dateTimeWithMS.toString()).to.equal('2010-03-03T12:45:30')
        })
      })

      describe('getFirstDateOfWeek', () => {
        it('returns first date of same week according to locale', () => {
          const wednesday = dateTimeWithNoMS.withWeekday(WEDNESDAY);
          expect(wednesday.getFirstDateOfWeek({firstWeekday: MONDAY}).date).to.eql(dateTimeWithNoMS.withWeekday(MONDAY).date)
          expect(wednesday.getFirstDateOfWeek().date).to.eql(dateTimeWithNoMS.withWeekday(MONDAY).date)
          expect(wednesday.getFirstDateOfWeek({firstWeekday: SUNDAY}).date).to.eql(dateTimeWithNoMS.withWeekday(SUNDAY).date)
        })
      })
    })

    describe('Static methods', () => {
      describe('getDaysInMonth', () => {
        it('lists days of given month', () => {
          expect(sequence(1, 12).map(getDaysInMonth.curry(leapYear))).to.eql(leapYearMonths)
          expect(sequence(1, 12).map(getDaysInMonth.curry(normalYear))).to.eql(normalYearMonths)
        })
      })

      describe('getDayInYear', () => {
        it('returns number between 0-365 depending on distance of 1st jan of same year', () => {
          expect(sequence(2000, 2010).map(getDayInYear.curry(__, 12, 31))).to.eql(yearSizes2000_2010)
        })
      })
    })
  }
})
