//简体中文
import { DateTime } from '../DateTime.js';
import { DateFormat } from '../DateFormat.js';
export const CN = {
    id: 'CN',
    monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    shortDayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
    yearsLabel: years => years + ' ' + (years === 1 ? '年' : '年'),
    monthsLabel: months => months + ' ' + (months === 1 ? '月' : '月'),
    daysLabel: days => days + ' ' + (days === 1 ? '日' : '日'),
    hoursLabel: (hours, minutes) => {
      const hoursAndMinutes = DateFormat.hoursAndMinutes(hours, minutes);
      return hoursAndMinutes + ' ' + (+hoursAndMinutes === 1 ? '小时' : '小时')
    },
    clearRangeLabel: '范围',
    clearDateLabel: '日期',
    shortDateFormat: 'Y年m月d日',
    weekDateFormat: 'Y年m月d日 D',
    dateTimeFormat: 'Y年m月d日 H时i分s秒',
    firstWeekday: DateTime.MONDAY,
    holidays: {
        "01-01": "元旦",
        "03-08": "妇女节",
        "03-12": "植树节",
        "05-01": "劳动节",
        "05-04": "青年节",
        "05-12": "护士节",
        "06-01": "儿童节",
        "08-01": "建军节",
        "09-10": "教师节",
        "10-01": "国庆节",
        "11-08": "中国记者节"
    }
};
