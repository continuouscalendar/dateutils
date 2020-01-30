import { DateLocale } from '../src/DateLocale.js';

describe('locale', () => {
  describe('Russian localizatioon', () => {
    const locale = DateLocale.RU;

    it('Years', () => {
      expect(locale.yearsLabel(1)).to.equal('1 Год');
      expect(locale.yearsLabel(2)).to.equal('2 Года');
      expect(locale.yearsLabel(3)).to.equal('3 Года');
      expect(locale.yearsLabel(4)).to.equal('4 Года');
      expect(locale.yearsLabel(5)).to.equal('5 Лет');
      expect(locale.yearsLabel(6)).to.equal('6 Лет');
      expect(locale.yearsLabel(11)).to.equal('11 Лет');
      expect(locale.yearsLabel(12)).to.equal('12 Лет');
      expect(locale.yearsLabel(20)).to.equal('20 Лет');
      expect(locale.yearsLabel(21)).to.equal('21 Год');
      expect(locale.yearsLabel(22)).to.equal('22 Года');
      expect(locale.yearsLabel(31)).to.equal('31 Год');
      expect(locale.yearsLabel(32)).to.equal('32 Года');
    });

    it('Months', () => {
      expect(locale.monthsLabel(1)).to.equal('1 Месяц');
      expect(locale.monthsLabel(2)).to.equal('2 Месяца');
      expect(locale.monthsLabel(3)).to.equal('3 Месяца');
      expect(locale.monthsLabel(4)).to.equal('4 Месяца');
      expect(locale.monthsLabel(5)).to.equal('5 Месяцев');
      expect(locale.monthsLabel(6)).to.equal('6 Месяцев');
      expect(locale.monthsLabel(11)).to.equal('11 Месяцев');
      expect(locale.monthsLabel(12)).to.equal('12 Месяцев');
      expect(locale.monthsLabel(20)).to.equal('20 Месяцев');
      expect(locale.monthsLabel(21)).to.equal('21 Месяц');
      expect(locale.monthsLabel(22)).to.equal('22 Месяца');
      expect(locale.monthsLabel(31)).to.equal('31 Месяц');
      expect(locale.monthsLabel(32)).to.equal('32 Месяца');
    });

    it('Days', () => {
      expect(locale.daysLabel(1)).to.equal('1 День');
      expect(locale.daysLabel(2)).to.equal('2 Дня');
      expect(locale.daysLabel(3)).to.equal('3 Дня');
      expect(locale.daysLabel(4)).to.equal('4 Дня');
      expect(locale.daysLabel(5)).to.equal('5 Дней');
      expect(locale.daysLabel(6)).to.equal('6 Дней');
      expect(locale.daysLabel(11)).to.equal('11 Дней');
      expect(locale.daysLabel(12)).to.equal('12 Дней');
      expect(locale.daysLabel(20)).to.equal('20 Дней');
      expect(locale.daysLabel(21)).to.equal('21 День');
      expect(locale.daysLabel(22)).to.equal('22 Дня');
      expect(locale.daysLabel(31)).to.equal('31 День');
      expect(locale.daysLabel(32)).to.equal('32 Дня');
    });

    it('Hours and minuts', () => {
      expect(locale.hoursLabel(0, 1)).to.equal('0,02 Часа');
      expect(locale.hoursLabel(0, 2)).to.equal('0,03 Часа');
      expect(locale.hoursLabel(1, 3)).to.equal('1,05 Часа');
      expect(locale.hoursLabel(2, 4)).to.equal('2,07 Часа');
      expect(locale.hoursLabel(0, 5)).to.equal('0,08 Часа');
      expect(locale.hoursLabel(1, 6)).to.equal('1,1 Часа');
      expect(locale.hoursLabel(0, 11)).to.equal('0,18 Часа');
      expect(locale.hoursLabel(1, 12)).to.equal('1,2 Часа');
      expect(locale.hoursLabel(1, 20)).to.equal('1,33 Часа');
      expect(locale.hoursLabel(0, 21)).to.equal('0,35 Часа');
      expect(locale.hoursLabel(1, 22)).to.equal('1,37 Часа');
    });
  });
  describe('holidays', () => {
    const locale = DateLocale.FI;

    it('shows holidays for finland', () => {
      expect(locale.holidays['2021-12-26']).to.equal('Tapaninpäivä');
    });
  });
});
