const Duration = require('../src/Duration')

describe('Duration', () => {
  with (Duration) {
    describe('creating durations with factory methods', () => {
      it('returns ms', () => expect(fromMS(1000).toMS()).to.equal(1000))
      it('returns seconds', () => expect(fromSeconds(1).toMS()).to.equal(1000))
      it('returns minutes', () => expect(fromMinutes(1).toMS()).to.equal(60000))
      it('returns hours', () => expect(fromHours(1).toMS()).to.equal(60 * 60000))
      it('returns days', () => expect(fromDays(1).toMS()).to.equal(24 * 60 * 60000))
      it('returns mixed content from isoTime', () => expect(fromIsoTime('1:40:10').toMS()).to.equal(60 * 60000 + 40 * 60000 + 10 * 1000))
      it('returns mixed content from isoTime with ms', () => expect(fromIsoTime('1:40:10:20').toMS()).to.equal(60 * 60000 + 40 * 60000 + 10 * 1000 + 20))
    })
    describe('returns durations in as different units', () => {
      let day
      before(() => {
        day = fromDays(1)
      })
      it('returns days', () => expect(day.asUnit(DAY)).to.equal(1))
      it('returns hours', () => expect(day.asUnit(HOUR)).to.equal(24))
      it('returns minutes', () => expect(day.asUnit(MIN)).to.equal(24 * 60))
      it('returns seconds', () => expect(day.asUnit(SECOND)).to.equal(24 * 60 * 60))
      it('returns ms', () => expect(day.asUnit(MS)).to.equal(24 * 60 * 60 * 1000))
    })
  }
})
