import { Duration } from '../src/Duration.js';

describe('Duration', () => {
  //with (Duration) {
    describe('creating durations with factory methods', () => {
      it('returns ms', () => expect(Duration.fromMS(1000).toMS()).to.equal(1000));
      it('returns seconds', () => expect(Duration.fromSeconds(1).toMS()).to.equal(1000));
      it('returns minutes', () => expect(Duration.fromMinutes(1).toMS()).to.equal(60000));
      it('returns hours', () => expect(Duration.fromHours(1).toMS()).to.equal(60 * 60000));
      it('returns days', () => expect(Duration.fromDays(1).toMS()).to.equal(24 * 60 * 60000));
      it('returns mixed content from isoTime', () => expect(Duration.fromIsoTime('1:40:10').toMS()).to.equal(60 * 60000 + 40 * 60000 + 10 * 1000));
      it('returns mixed content from isoTime with ms', () => expect(Duration.fromIsoTime('1:40:10:20').toMS()).to.equal(60 * 60000 + 40 * 60000 + 10 * 1000 + 20));
    });
    describe('returns durations in as different units', () => {
      let day;
      before(() => {
        day = Duration.fromDays(1);
      });
      it('returns days', () => expect(day.asUnit(Duration.DAY)).to.equal(1));
      it('returns hours', () => expect(day.asUnit(Duration.HOUR)).to.equal(24));
      it('returns minutes', () => expect(day.asUnit(Duration.MIN)).to.equal(24 * 60));
      it('returns seconds', () => expect(day.asUnit(Duration.SECOND)).to.equal(24 * 60 * 60));
      it('returns ms', () => expect(day.asUnit(Duration.MS)).to.equal(24 * 60 * 60 * 1000));
      it('returns ms', () => expect(day.asUnit(Duration.MS)).to.equal(24 * 60 * 60 * 1000));
    })
  //}
});
