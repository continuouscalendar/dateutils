$.continuousCalendar={};$.continuousCalendar.version="";$.continuousCalendar.released="2012-10-24";(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery"],b)}else{a.DateTime=b(a.jQuery)}})(this,function(a){var b=function(c){if(typeof c=="string"){this.date=new Date(c)}else{this.date=c||new Date()}};a.each(["getTime","getFullYear","getMonth","getDate","getDay","getHours","getMinutes","getSeconds","getMilliseconds"],function(d,c){b.prototype[c]=function(){return this.date[c]()}});b.prototype.withTime=function(d,c){var e=this.clone();e.date.setHours(d);e.date.setMinutes(c);e.date.setMilliseconds(0);return e};b.DAYS_IN_MONTH=[31,28,31,30,31,30,31,31,30,31,30,31];b.SECOND=1000;b.MINUTE=60*b.SECOND;b.HOUR=60*b.MINUTE;b.DAY=24*b.HOUR;b.WEEK=7*b.DAY;b.now=function(){if(typeof b._now=="undefined"){b._now=new b()}return b._now};b.getDaysInMonth=function(c,d){if(((0==(c%4))&&((0!=(c%100))||(0==(c%400))))&&d==1){return 29}else{return b.DAYS_IN_MONTH[d]}};b.getDayInYear=function(e,f,c){var g=0;for(var d=0;d<f;d++){g+=b.getDaysInMonth(e,d)}g+=c;return g};b.prototype.getDaysInMonth=function(){return b.getDaysInMonth(this.getFullYear(),this.getMonth())};b.prototype.getDayInYear=function(){return b.getDayInYear(this.getFullYear(),this.getMonth(),this.getDate())};b.prototype.plusDays=function(f){var d=this.clone();var c=this.getHours();d.date.setTime(this.getTime()+f*b.DAY);var e=c-d.getHours();if(e!=0){if(e>12){e-=24}if(e<-12){e+=24}d.date.setTime(d.getTime()+(e*b.HOUR))}return d};b.prototype.stripped=function(){return new Date(parseInt(this.getTime()/b.DAY,10))};b.prototype.compareTo=function(d){if(!d){return 1}var c=this.getTime();var e=d.getTime();if(c<e){return -1}else{if(c>e){return 1}else{return 0}}};b.prototype.isToday=function(){return this.equalsOnlyDate(b.now())};b.prototype.getWeekInYear=function(d){if(d!="US"&&d!="ISO"){throw ("Week numbering system must be either US or ISO, was "+d)}var c=new Date(this.getFullYear(),0,1).getDay();if(d=="US"){return Math.ceil((this.getDayInYear()+c)/7)}var g=4;var f=this.getDay();if(f==0){f=7}if(c==0){c=7}if(this.getMonth()==11&&this.getDate()>=29&&(this.getDate()-f)>27){return 1}if(this.getMonth()==0&&this.getDate()<4&&f>g){return new b(new Date(this.getFullYear()-1,11,31)).getWeekInYear("ISO")}var e=Math.ceil((this.getDayInYear()+c-1)/7);if(c>g){e--}return e};b.prototype.clone=function(){return new b(new Date(this.getTime()))};b.prototype.isOddMonth=function(){return this.getMonth()%2!=0};b.prototype.equalsOnlyDate=function(c){if(!c){return false}return this.getMonth()==c.getMonth()&&this.getDate()==c.getDate()&&this.getFullYear()==c.getFullYear()};b.prototype.isBetweenDates=function(d,c){return this.compareTo(d)>=0&&this.compareTo(c)<=0};b.prototype.firstDateOfMonth=function(){return new b((this.getMonth()+1)+"/1/"+this.getFullYear())};b.prototype.lastDateOfMonth=function(){return new b((this.getMonth()+1)+"/"+this.getDaysInMonth()+"/"+this.getFullYear())};b.prototype.distanceInDays=function(c){var e=parseInt(this.getTime()/b.DAY,10);var d=parseInt(c.getTime()/b.DAY,10);return(d-e)};b.prototype.withWeekday=function(c){return this.plusDays(c-this.getDay())};b.prototype.getOnlyDate=function(){return new b(new Date(this.getFullYear(),this.getMonth(),this.getDate()))};b.prototype.getTimezone=function(){return this.date.toString().replace(/^.*? ([A-Z]{3}) [0-9]{4}.*$/,"$1").replace(/^.*?\(([A-Z])[a-z]+ ([A-Z])[a-z]+ ([A-Z])[a-z]+\)$/,"$1$2$3")};b.prototype.getDayOfYear=function(){var c=0;b.daysInMonth[1]=this.isLeapYear()?29:28;for(var d=0;d<this.getMonth();++d){c+=b.daysInMonth[d]}return c+this.getDate()-1};b.prototype.isLeapYear=function(){var c=this.getFullYear();return((c&3)==0&&(c%100||(c%400==0&&c)))};b.prototype.getDaysInMonth=function(){b.daysInMonth[1]=this.isLeapYear()?29:28;return b.daysInMonth[this.getMonth()]};b.prototype.getSuffix=function(){switch(this.getDate()){case 1:case 21:case 31:return"st";case 2:case 22:return"nd";case 3:case 23:return"rd";default:return"th"}};b.prototype.isWeekend=function(){return this.getDay()==6||this.getDay()==0};b.prototype.toString=function(){return this.date.toISOString()};b.daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31];b.y2kYear=50;b.monthNumbers={Jan:0,Feb:1,Mar:2,Apr:3,May:4,Jun:5,Jul:6,Aug:7,Sep:8,Oct:9,Nov:10,Dec:11};return b});(function(a,b){if(typeof define==="function"&&define.amd){define(b)}else{a.DateLocale=b()}})(this,function(){var a={};a.MONDAY=1;a.FRIDAY=5;a.SUNDAY=0;a.hoursAndMinutes=function(b,c){return(Math.round((b+c/60)*100)/100).toString()};a.FI={id:"FI",monthNames:["tammikuu","helmikuu","maaliskuu","huhtikuu","toukokuu","kesäkuu","heinäkuu","elokuu","syyskuu","lokakuu","marraskuu","joulukuu"],dayNames:["sunnuntai","maanantai","tiistai","keskiviikko","torstai","perjantai","lauantai"],shortDayNames:["su","ma","ti","ke","to","pe","la"],yearsLabel:function(b){return b+" "+(b=="1"?"vuosi":"vuotta")},monthsLabel:function(b){return b+" "+(b=="1"?"kuukausi":"kuukautta")},daysLabel:function(b){return b+" "+(b=="1"?"päivä":"päivää")},hoursLabel:function(c,d){var b=a.hoursAndMinutes(c,d).replace(".",",");return b+" "+(b=="1"?"tunti":"tuntia")},shortDateFormat:"j.n.Y",weekDateFormat:"D j.n.Y",dateTimeFormat:"D j.n.Y k\\lo G:i",firstWeekday:a.MONDAY,getFirstDateOfWeek:function(b){return a.getFirstDateOfWeek(b,a.MONDAY)}};a.EN={id:"EN",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],yearsLabel:function(b){return b+" "+(b=="1"?"Year":"Years")},monthsLabel:function(b){return b+" "+(b=="1"?"Months":"Months")},daysLabel:function(b){return b+" "+(b=="1"?"Day":"Days")},hoursLabel:function(c,d){var b=a.hoursAndMinutes(c,d);return b+" "+(b=="1"?"Hour":"Hours")},shortDateFormat:"n/j/Y",weekDateFormat:"D n/j/Y",dateTimeFormat:"D n/j/Y G:i",firstWeekday:a.SUNDAY,getFirstDateOfWeek:function(b){return a.getFirstDateOfWeek(b,a.SUNDAY)}};a.AU={id:"AU",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],shortDayNames:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],yearsLabel:function(b){return b+" "+(b=="1"?"Year":"Years")},monthsLabel:function(b){return b+" "+(b=="1"?"Months":"Months")},daysLabel:function(b){return b+" "+(b=="1"?"Day":"Days")},hoursLabel:function(c,d){var b=a.hoursAndMinutes(c,d);return b+" "+(b=="1"?"Hour":"Hours")},shortDateFormat:"j/n/Y",weekDateFormat:"D j/n/Y",dateTimeFormat:"D j/n/Y G:i",firstWeekday:a.SUNDAY,getFirstDateOfWeek:function(b){return a.getFirstDateOfWeek(b,a.SUNDAY)}};a.DEFAULT=a.EN;a.getFirstDateOfWeek=function(b,c){if(c<b.getDay()){return b.plusDays(c-b.getDay())}else{if(c>b.getDay()){return b.plusDays(c-b.getDay()-7)}else{return b.clone()}}};a.fromArgument=function(b){if(typeof b=="string"){return a[b]}else{return b||a.DEFAULT}};return a});(function(a,b){if(typeof define==="function"&&define.amd){define(["./DateTime"],b)}else{a.DateFormat=b(a.DateTime)}})(this,function(DateTime){var DateFormat={};DateFormat.parseFunctions={count:0};DateFormat.parseRegexes=[];DateFormat.formatFunctions={count:0};DateFormat.format=function(dateTime,format,locale){if(DateFormat.formatFunctions[format]==null){DateFormat.createNewFormat(dateTime,format,locale)}var func=DateFormat.formatFunctions[format];return dateTime[func]()};DateFormat.shortDateFormat=function(dateTime,locale){return DateFormat.format(dateTime,locale?locale.shortDateFormat:"n/j/Y",locale)};DateFormat.formatRange=function(dateRange,locale){if(dateRange._hasTimes){return locale.daysLabel(dateRange.days())+" "+locale.hoursLabel(dateRange.hours(),dateRange.minutes())}else{return DateFormat.shortDateFormat(dateRange.start,locale)+" - "+DateFormat.shortDateFormat(dateRange.end,locale)}};DateFormat.formatDefiningRangeDuration=function(dateRange,locale){var years=parseInt(dateRange.days()/360,10);if(years>0){return locale.yearsLabel(years)}var months=parseInt(dateRange.days()/30,10);if(months>0){return locale.monthsLabel(months)}return locale.daysLabel(dateRange.days())};DateFormat.getWeekOfYear=function(dateTime){var now=dateTime.getDayOfYear()+(4-dateTime.getDay());var jan1=new Date(dateTime.getFullYear(),0,1);var then=(7-jan1.getDay()+4);document.write(then);return DateFormat.leftPad(((now-then)/7)+1,2,"0")};DateFormat.getGMTOffset=function(dateTime){return(dateTime.date.getTimezoneOffset()>0?"-":"+")+DateFormat.leftPad(Math.floor(dateTime.getTimezoneOffset()/60),2,"0")+DateFormat.leftPad(dateTime.getTimezoneOffset()%60,2,"0")};DateFormat.leftPad=function(val,size,ch){var result=new String(val);if(ch==null){ch=" "}while(result.length<size){result=ch+result}return result};DateFormat.escape=function(string){return string.replace(/('|\\)/g,"\\$1")};DateFormat.parse=function(input,locale){if(input=="today"){return DateTime.now()}var date=new Date(input);if(isNaN(date.getTime())){throw Error('Could not parse date from "'+input+'"')}return new DateTime(date,locale)};DateFormat.patterns={ISO8601LongPattern:"Y-m-d H:i:s",ISO8601ShortPattern:"Y-m-d",ShortDatePattern:"n/j/Y",FiShortDatePattern:"j.n.Y",FiWeekdayDatePattern:"D j.n.Y",FiWeekdayDateTimePattern:"D j.n.Y k\\lo G:i",LongDatePattern:"l, F d, Y",FullDateTimePattern:"l, F d, Y g:i:s A",MonthDayPattern:"F d",ShortTimePattern:"g:i A",LongTimePattern:"g:i:s A",SortableDateTimePattern:"Y-m-d\\TH:i:s",UniversalSortableDateTimePattern:"Y-m-d H:i:sO",YearMonthPattern:"F, Y"};DateFormat.parseTime=function(timeStr){var splittedTime=splitTime(timeStr.replace(/:|,/i,"."));var time=[parseInt(splittedTime[0],10),parseInt(splittedTime[1],10)];return(isHour(time[0])&&isMinute(time[1]))?time:null;function splitTime(timeStr){if(timeStr.indexOf(".")!=-1){return timeStr.split(".")}switch(timeStr.length){case 4:return[timeStr.slice(0,2),timeStr.slice(2,4)];case 3:return[timeStr.slice(0,1),timeStr.slice(1,3)];case 2:return[timeStr,0];default:return[-1,-1]}}function isMinute(minutes){return !isNaN(minutes)&&minutes>=0&&minutes<=59}function isHour(hours){return !isNaN(hours)&&hours>=0&&hours<=23}};DateFormat.createNewFormat=function(dateTime,format,locale){var funcName="format"+DateFormat.formatFunctions.count++;DateFormat.formatFunctions[format]=funcName;var code="DateTime.prototype."+funcName+" = function(){return ";var special=false;var ch="";for(var i=0;i<format.length;++i){ch=format.charAt(i);if(!special&&ch=="\\"){special=true}else{if(special){special=false;code+="'"+DateFormat.escape(ch)+"' + "}else{code+=DateFormat.getFormatCode(ch,locale)}}}eval(code.substring(0,code.length-3)+";}")};DateFormat.getFormatCode=function(character){switch(character){case"d":return"DateFormat.leftPad(this.getDate(), 2, '0') + ";case"D":return"locale.shortDayNames[this.getDay()] + ";case"j":return"this.getDate() + ";case"l":return"locale.dayNames[this.getDay()] + ";case"S":return"this.getSuffix() + ";case"w":return"this.getDay() + ";case"z":return"this.getDayOfYear() + ";case"W":return"DateFormat.getWeekOfYear(this) + ";case"F":return"locale.monthNames[this.getMonth()] + ";case"m":return"DateFormat.leftPad(this.getMonth() + 1, 2, '0') + ";case"M":return"locale.monthNames[this.getMonth()].substring(0, 3) + ";case"n":return"(this.getMonth() + 1) + ";case"t":return"this.getDaysInMonth() + ";case"L":return"(this.isLeapYear() ? 1 : 0) + ";case"Y":return"this.getFullYear() + ";case"y":return"('' + this.getFullYear()).substring(2, 4) + ";case"a":return"(this.getHours() < 12 ? 'am' : 'pm') + ";case"A":return"(this.getHours() < 12 ? 'AM' : 'PM') + ";case"g":return"((this.getHours() %12) ? this.getHours() % 12 : 12) + ";case"G":return"this.getHours() + ";case"h":return"DateFormat.leftPad((this.getHours() %12) ? this.getHours() % 12 : 12, 2, '0') + ";case"H":return"DateFormat.leftPad(this.getHours(), 2, '0') + ";case"i":return"DateFormat.leftPad(this.getMinutes(), 2, '0') + ";case"s":return"DateFormat.leftPad(this.getSeconds(), 2, '0') + ";case"O":return"DateFormat.getGMTOffset(this) + ";case"T":return"this.getTimezone() + ";case"Z":return"(this.getTimezoneOffset() * -60) + ";default:return"'"+DateFormat.escape(character)+"' + "}};return DateFormat});(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","./DateTime","./DateFormat"],b)}else{a.DateRange=b(a.jQuery,a.DateTime,a.DateFormat)}})(this,function(b,c,a){function d(f,e){if(!f||!e){throw ("two dates must be specified, date1="+f+", date2="+e)}this.start=(f.compareTo(e)>0?e:f);this.end=(f.compareTo(e)>0?f:e);this._days=0;this._hours=0;this._minutes=0;this._valid=true}d.prototype={_setDaysHoursAndMinutes:function(){if(this._hasTimes){var e=parseInt((this.end.getTime()-this.start.getTime()));this._days=parseInt(e/c.DAY);e=e-(this._days*c.DAY);this._hours=parseInt(e/c.HOUR);e=e-(this._hours*c.HOUR);this._minutes=parseInt(e/c.MINUTE)}},_dateWithTime:function(e,f){return e.withTime(f[0],f[1])},hours:function(){return this._hours},minutes:function(){return this._minutes},hasDate:function(e){return e.isBetweenDates(this.start,this.end)},isValid:function(){return this._valid&&this.end.getTime()-this.start.getTime()>=0},days:function(){if(this._hasTimes){return this._days}else{return Math.round(this.start.distanceInDays(this.end)+1)}},shiftDays:function(e){return new d(this.start.plusDays(e),this.end.plusDays(e))},expandTo:function(f){var e=this.start.clone();var g=this.end.clone();if(f.compareTo(this.start)<0){e=f}else{if(f.compareTo(this.end)>0){g=f}}return new d(e,g)},expandDaysTo:function(e){return new d(this.start,this.start.plusDays(e-1))},hasValidSize:function(e){return e<0||this.days()>=e},hasValidSizeAndEndsOnWorkWeek:function(e){return this.hasValidSize(e)&&this.hasEndsOnWeekend()},and:function(e){var g=this.start.compareTo(e.start)>0?this.start:e.start;var f=this.end.compareTo(e.end)>0?e.end:this.end;if(g.compareTo(f)<0){return new d(g,f)}else{return d.emptyRange()}},isInside:function(e){return this.start.compareTo(e.start)>=0&&this.end.compareTo(e.end)<=0},hasEndsOnWeekend:function(){return this.start.isWeekend()||this.end.isWeekend()},withTimes:function(i,h){var g=a.parseTime(i);var e=a.parseTime(h);var f=this.clone();if(g&&e){f._valid=true;f._hasTimes=true;f.start=this._dateWithTime(this.start,g);f.end=this._dateWithTime(this.end,e);f._setDaysHoursAndMinutes()}else{f._valid=false}return f},clone:function(){return new d(this.start,this.end)},toString:function(){return["DateRange:",this.start.toString(),"-",this.end.toString(),this._days,"days",this._hours,"hours",this._minutes,"minutes",this._valid?"valid":"invalid"].join(" ")},isPermittedRange:function(g,e,f){return this.hasValidSize(g)&&(!(e&&this.hasEndsOnWeekend()))&&this.isInside(f)},shiftInside:function(f){if(this.days()>f.days()){return d.emptyRange()}var g=this.start.distanceInDays(f.start);var e=this.end.distanceInDays(f.end);if(g>0){return this.shiftDays(g)}if(e<0){return this.shiftDays(e)}return this}};d=b.extend(d,{emptyRange:function(){function e(){this.start=null;this.end=null;this.days=function(){return 0};this.shiftDays=b.noop;this.hasDate=function(){return false};this.clone=function(){return d.emptyRange()}}return new e()},rangeWithMinimumSize:function(k,j,f,i){if(g()){var e=k.expandDaysTo(j);if(f&&e.hasEndsOnWeekend()){var h=e.shiftDays(l(e.end.getDay())).shiftInside(i);while(!h.isPermittedRange(j,f,i)||h.end.compareTo(i.end)>0){if(!h.isPermittedRange(j,false,i)){return d.emptyRange()}h=h.shiftDays(1)}e=h}if(!e.isPermittedRange(j,false,i)){return d.emptyRange()}return e}return k;function g(){return j&&k.days()<=j}function l(m){return -((m+1)%7+1)}}});return d})
/*!
 * Tiny Scrollbar 1.66
 * http://www.baijs.nl/tinyscrollbar/
 *
 * Copyright 2010, Maarten Baijs
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.opensource.org/licenses/gpl-2.0.php
 *
 * Date: 13 / 11 / 2011
 * Depends on library: jQuery
 * 
 */
;(function(a){a.tiny=a.tiny||{};a.tiny.scrollbar={options:{axis:"y",wheel:40,scroll:true,size:"auto",sizethumb:"auto"}};a.fn.tinyscrollbar=function(c){var c=a.extend({},a.tiny.scrollbar.options,c);this.each(function(){a(this).data("tsb",new b(a(this),c))});return this};a.fn.tinyscrollbar_update=function(c){return a(this).data("tsb").update(c)};function b(p,f){var j=this;var s=p;var i={obj:a(".viewport",p)};var g={obj:a(".overview",p)};var d={obj:a(".scrollbar",p)};var l={obj:a(".track",d.obj)};var o={obj:a(".thumb",d.obj)};var k=f.axis=="x",m=k?"left":"top",u=k?"Width":"Height";var q,x={start:0,now:0},n={};function c(){j.update();r();return j}this.update=function(B){var C=f.axis;i[C]=i.obj[0]["offset"+u];g[C]=g.obj[0]["scroll"+u];var D=g[C];var y=i[C];g.ratio=y/D;d.obj.toggleClass("disable",g.ratio>=1);l[C]=f.size=="auto"?y:f.size;var z=l[C];o[C]=Math.min(z,Math.max(0,(f.sizethumb=="auto"?(z*g.ratio):f.sizethumb)));var A=o[C];d.ratio=f.sizethumb=="auto"?(D/z):(D-y)/(z-A);q=(B=="relative"&&g.ratio<=1)?Math.min((D-y),Math.max(0,q)):0;q=(B=="bottom"&&g.ratio<=1)?(D-y):isNaN(parseInt(B))?q:parseInt(B);v()};function v(){o.obj.css(m,q/d.ratio);g.obj.css(m,-q);n.start=o.obj.offset()[m];var y=u.toLowerCase();d.obj.css(y,l[f.axis]);l.obj.css(y,l[f.axis]);o.obj.css(y,o[f.axis])}function r(){o.obj.bind("mousedown",h);o.obj[0].ontouchstart=function(y){y.preventDefault();o.obj.unbind("mousedown");h(y.touches[0]);return false};l.obj.bind("mouseup",t);if(f.scroll&&this.addEventListener){s[0].addEventListener("DOMMouseScroll",w,false);s[0].addEventListener("mousewheel",w,false)}else{if(f.scroll){s[0].onmousewheel=w}}}function h(z){n.start=k?z.pageX:z.pageY;var y=parseInt(o.obj.css(m));x.start=y=="auto"?0:y;a(document).bind("mousemove",t);document.ontouchmove=function(A){a(document).unbind("mousemove");t(A.touches[0])};a(document).bind("mouseup",e);o.obj.bind("mouseup",e);o.obj[0].ontouchend=document.ontouchend=function(A){a(document).unbind("mouseup");o.obj.unbind("mouseup");e(A.touches[0])};return false}function w(z){if(!(g.ratio>=1)){var z=z||window.event;var y=z.wheelDelta?z.wheelDelta/120:-z.detail/3;q-=y*f.wheel;q=Math.min((g[f.axis]-i[f.axis]),Math.max(0,q));o.obj.css(m,q/d.ratio);g.obj.css(m,-q);z=a.event.fix(z);z.preventDefault()}}function e(y){a(document).unbind("mousemove",t);a(document).unbind("mouseup",e);o.obj.unbind("mouseup",e);document.ontouchmove=o.obj[0].ontouchend=document.ontouchend=null;return false}function t(y){if(!(g.ratio>=1)){x.now=Math.min((l[f.axis]-o[f.axis]),Math.max(0,(x.start+((k?y.pageX:y.pageY)-n.start))));q=x.now*d.ratio;g.obj.css(m,-q);o.obj.css(m,x.now)}return false}return c()}})(jQuery);(function(a,b){if(typeof define==="function"&&define.amd){define(["jquery","tinyscrollbar","./DateFormat","./DateLocale","./DateRange","./DateTime"],function(e,c,d,h,g,f){b(e,d,h,g,f)})}else{b(a.jQuery,a.DateFormat,a.DateLocale,a.DateRange,a.DateTime)}})(this,function(b,a,e,d,c){b.fn.continuousCalendar=function(f){return this.each(function(){g.call(b(this),f)});function g(ac){b(this).addClass("continuousCalendarContainer").append("&nbsp;");var U={weeksBefore:26,weeksAfter:26,firstDate:null,lastDate:null,startField:b("input.startDate",this),endField:b("input.endDate",this),isPopup:false,selectToday:false,locale:e.DEFAULT,disableWeekends:false,disabledDates:null,minimumRange:-1,selectWeek:false,fadeOutDuration:0,callback:b.noop,customScroll:false};var au=b.extend({},U,ac);au.locale=e.fromArgument(au.locale);var K={CREATE_OR_RESIZE:"create",MOVE:"move",NONE:"none"};var aD=t(au.startField);var ah=t(au.endField);var V=c.now();if(au.selectToday){var k=G(V);aD=V;ah=V;p(k);aj(k)}var T=au.locale.getFirstDateOfWeek(aD||V);var al=this,an=[],aG=[],aw={},j=null,O,X,aE,l,H,L=K.NONE,J,i,aa=true,I,q,M;az();function az(){q=b.extend(ap(au.isPopup),ax(af()));aE=aD&&ah?new d(aD,ah,au.locale):d.emptyRange(au.locale);l=aE.clone();var aK=au.firstDate?a.parse(au.firstDate,au.locale):T.plusDays(-(au.weeksBefore*7));var aJ=au.lastDate?a.parse(au.lastDate,au.locale):T.plusDays(au.weeksAfter*7+6);au.disabledDates=au.disabledDates?ar(au.disabledDates):{};au.fadeOutDuration=parseInt(au.fadeOutDuration,10);H=new d(aK,aJ,au.locale);J=y();J.click(function(aL){aL.stopPropagation()});if(b(".startDateLabel",al).isEmpty()){ay(al,q)}q.initUI();q.showInitialSelection();q.performTrigger()}function ak(){if(au.customScroll){M=b(".tinyscrollbar",al);M.tinyscrollbar()}}function ag(){if(i){return}var aJ=b("<table>").addClass("calendarHeader").append(aC());if(au.customScroll){I=b("<table>").addClass("calendarBody").addClass("overview").append(aH());i=b("<div>").addClass("calendarScrollContent").addClass("viewport").append(I);J.append(aJ).append(b('<div class="tinyscrollbar"></div>').append('<div class="scrollbar"> <div class="track"> <div class="thumb"> <div class="end"></div> </div> </div> </div>').append(i))}else{I=b("<table>").addClass("calendarBody").append(aH());i=b("<div>").addClass("calendarScrollContent").append(I);J.append(aJ).append(i)}an=b("td.date",al).get();q.initState();q.addRangeLengthLabel();s();X=b("th.month",aJ);D();q.initEvents();if(!au.isPopup){w();S()}}function D(){var aJ=false;i.scroll(function(){aJ=true});setInterval(function(){if(aJ){aJ=false;w()}},250)}function ar(aK){var aJ={};b.each(aK.split(" "),function(aM,aL){aJ[a.parse(aL).date]=true});return aJ}function ax(aL){var aJ={showInitialSelection:A,initEvents:function(){R(al,I);av()},addRangeLengthLabel:function(){if(b(".rangeLengthLabel",al).isEmpty()){var aM=b('<div class="label"><span class="rangeLengthLabel"></span></div>');b(".continuousCalendar",al).append(aM)}},addEndDateLabel:function(aM){aM.append('<span class="separator"> - </span>').append('<span class="endDateLabel"></span>')},performTrigger:function(){al.data("calendarRange",aE);aF(aE)}};var aK={showInitialSelection:function(){if(au.startField.val()){o(a.format(a.parse(au.startField.val()),au.locale.weekDateFormat,au.locale))}},initEvents:function(){at();var aM=aD&&a.format(aD,"Ymd",au.locale);if(aM in aw){Q(aw[aM]).addClass("selected")}},addRangeLengthLabel:b.noop,addEndDateLabel:b.noop,performTrigger:function(){al.data("calendarRange",aD);aF(aD)}};return aL?aJ:aK}function ap(aJ){var aL={initUI:function(){J.addClass("popup").hide();var aM=b('<a href="#" class="calendarIcon">'+V.getDate()+"</a>").click(E);al.prepend("<div></div>");al.prepend(aM)},initState:b.noop,getContainer:function(aM){return b("<div>").addClass("popUpContainer").append(aM)},close:function(aM){E.call(aM)},addDateLabelBehaviour:function(aM){aM.addClass("clickable");aM.click(E)}};var aK={initUI:ag,initState:B,getContainer:function(aM){return aM},close:b.noop,addDateLabelBehaviour:b.noop};return aJ?aL:aK}function s(){var aJ=a.format(V,"Ymd",au.locale);if(aJ in aw){Q(aw[aJ]).addClass("today").wrapInner("<div>")}}function y(){var aJ=b(".continuousCalendar",al);if(aJ.exists()){return aJ}else{var aK=b("<div>").addClass("continuousCalendar");al.append(q.getContainer(aK));return aK}}function ay(aJ,aL){var aK=b('<div class="label"><span class="startDateLabel"></span></div>');aL.addEndDateLabel(aK);aJ.prepend(aK);aL.addDateLabelBehaviour(aK.children())}function R(aK,aJ){b("span.rangeLengthLabel",aK).text(au.locale.daysLabel(aE.days()));aJ.addClass(au.selectWeek?"weekRange":"freeRange");aJ.mousedown(C).mouseover(ao).mouseup(z);aI(aJ.get(0))}function S(){var aK=b(".selected, .today",i).get(0);if(aK){var aJ=aK.offsetTop-(i.height()-aK.offsetHeight)/2;if(au.customScroll){var aL=I.height();var aM=aL-i.height();var aN=aJ>aM?aM:aJ;M.tinyscrollbar_update(aN>0?aN:0)}else{i.scrollTop(aJ)}}}function w(){var aJ=b(".calendarScrollContent",al).get(0);var aM=b("table",aJ).get(0);var aK=parseInt(aJ.scrollTop/O);var aL=h(aM.rows[aK].cells[2]);X.text(aL.getFullYear())}function aC(){var aK=b("<tr>").append(aJ());aK.append(b('<th class="week">&nbsp;</th>'));b(au.locale.dayNames).each(function(aM){var aL=b("<th>").append(au.locale.dayNames[(aM+au.locale.firstWeekday)%7].substr(0,2)).addClass("weekDay");aK.append(aL)});return b("<thead>").append(aK);function aJ(){return b("<th>").addClass("month").append(T.getFullYear())}}function B(){ak();P();S()}function P(){O=parseInt(I.height()/b("tr",I).size())}function E(){ag();if(J.is(":visible")){J.fadeOut(au.fadeOutDuration);b(document).unbind("click.continuousCalendar")}else{J.show();if(aa){ak();P();w();aa=false}S();b(document).bind("click.continuousCalendar",E)}return false}function aH(){var aK=au.locale.getFirstDateOfWeek(H.start);var aJ=true;var aL=[];while(aK.compareTo(H.end)<=0){Y(aL,aK.clone(),aJ);aJ=false;aK=aK.plusDays(7)}return"<tbody>"+aL.join("")+"</tbody>"}function Y(aN,aK,aJ){aN.push("<tr>");aN.push(x(aK,aJ));aN.push(ae(aK));for(var aM=0;aM<7;aM++){var aL=aK.plusDays(aM);aN.push(aB(aL))}aN.push("</tr>")}function aB(aJ){var aK='<td class="'+F(aJ)+'" date-cell-index="'+aG.length+'">'+aJ.getDate()+"</td>";aw[a.format(aJ,"Ymd",au.locale)]=aG.length;aG.push(aJ);return aK}function x(aK,aJ){var aL='<th class="month '+ai(aK);if(aJ||aK.getDate()<=7){aL+=' monthName">';aL+=au.locale.monthNames[aK.getMonth()]}else{aL+='">';if(aK.getDate()<=7*2&&aK.getMonth()==0){aL+=aK.getFullYear()}}return aL+"</th>"}function ae(aJ){return'<th class="week '+ai(aJ)+'">'+aJ.getWeekInYear("ISO")+"</th>"}function F(aJ){return b.trim(["date",ai(aJ),r(aJ),u(aJ),am(aJ)].sort().join(" "))}function ai(aJ){return aJ.isOddMonth()?"odd":""}function r(aJ){var aK=au.disableWeekends&&aJ.isWeekend();var aL=au.disabledDates[aJ.getOnlyDate().date];var aM=!H.hasDate(aJ);return aM||aK||aL?"disabled":""}function u(aJ){return aJ.isToday()?"today":""}function am(aJ){return aJ.getDay()==0?"holiday":""}function at(){b(".date",al).bind("click",function(){var aK=b(this);if(aK.hasClass("disabled")){return}b("td.selected",al).removeClass("selected");aK.addClass("selected");var aJ=h(aK.get(0));au.startField.val(a.shortDateFormat(aJ,au.locale));o(a.format(aJ,au.locale.weekDateFormat,au.locale));q.close(this);aF(aJ)})}function ad(){aE=new d(j,j,au.locale)}function C(aN){var aM=aN.target;if(aO(aN)){aE=aL(aN);return}L=K.CREATE_OR_RESIZE;j=h(aM);if(j.equalsOnlyDate(aE.end)){j=aE.start;return}if(j.equalsOnlyDate(aE.start)){j=aE.end;return}if(aE.hasDate(j)){L=K.MOVE;return}if(aK(aM)){ad()}function aK(aP){return N(aP)&&aq(aP)}function aO(aP){if(au.selectWeek){return aK(aP.target)||n(aP.target)}else{return n(aP.target)||Z(aP.target)||aP.shiftKey}}function aL(aS){var aR=aS.target;if((au.selectWeek&&aK(aR))||n(aR)){L=K.NONE;var aP=h(b(aR).parent().children(".date").get(0));return aJ(aP)}else{if(Z(aR)){L=K.NONE;var aQ=h(b(aR).siblings(".date").get(0));return new d(aQ.firstDateOfMonth(),aQ.lastDateOfMonth(),au.locale)}else{if(aS.shiftKey){if(aE.days()>0&&aK(aR)){L=K.NONE;aE=aE.expandTo(h(aR));return aE}}}}return aE}function aJ(aQ){var aP=aQ;var aR=aQ.plusDays(6);if(au.disableWeekends){aP=aQ.withWeekday(e.MONDAY);aR=aQ.withWeekday(e.FRIDAY)}return new d(aP,aR,au.locale).and(H)}}function ao(aK){if(L==K.NONE){return}var aJ=h(aK.target);({move:function(){var aL=j.distanceInDays(aJ);var aM=aE.shiftDays(aL).and(H);if(v(aM)){j=aJ;aE=aM}},create:function(){var aL=new d(j,aJ,au.locale);if(aq(aK.target)&&v(aL)){aE=aL}}})[L]();av()}function v(aJ){return aJ.isPermittedRange(au.minimumRange,au.disableWeekends,H)}function z(){L=K.NONE;av();aA()}function av(){aE=d.rangeWithMinimumSize(aE,au.minimumRange,au.disableWeekends,H);ab(aE);b("span.rangeLengthLabel",al).text(au.locale.daysLabel(aE.days()))}function ab(aJ){b("td.selected",al).removeClass("selected").removeClass("rangeStart").removeClass("rangeEnd");W(aJ);l=aJ.clone()}function W(aJ){if(aJ.days()==0){return}var aM=aw[a.format(aJ.start,"Ymd",au.locale)];var aL=aw[a.format(aJ.end,"Ymd",au.locale)];for(var aK=aM;aK<=aL;aK++){m(aK,aJ.start,aJ.end)}}function m(aM,aO,aJ){var aL=aG[aM];var aN=Q(aM).get(0);var aK=[F(aL)];if(aL.equalsOnlyDate(aJ)){aK.push("selected rangeEnd")}else{if(aL.equalsOnlyDate(aO)){aK.push("selected rangeStart")}else{if(aL.isBetweenDates(aO,aJ)){aK.push("selected")}}}aN.className=aK.join(" ")}function aA(){var aK=G(aE.start);var aJ=G(aE.end);al.data("calendarRange",aE);p(aK);aj(aJ);A();if(au.selectWeek){q.close(b("td.selected",al).first())}aF(aE)}function A(){if(aE.start&&aE.end){var aJ=au.locale.weekDateFormat;b("span.startDateLabel",al).text(a.format(aE.start,aJ,au.locale));b("span.endDateLabel",al).text(a.format(aE.end,aJ,au.locale));b("span.separator",al).show()}else{b("span.separator",al).hide()}}function t(aJ){return aJ.length>0&&aJ.val().length>0?a.parse(aJ.val()):null}function aI(aJ){if(b.browser.mozilla){b(aJ).css("MozUserSelect","none")}else{if(b.browser.msie){b(aJ).bind("selectstart",function(){return false})}else{b(aJ).mousedown(function(){return false})}}}function aF(aJ){au.callback.call(al,aJ);al.trigger("calendarChange",aJ)}function N(aJ){return b(aJ).closest("[date-cell-index]").hasClass("date")}function n(aJ){return b(aJ).hasClass("week")}function Z(aJ){return b(aJ).hasClass("month")}function aq(aJ){return !b(aJ).hasClass("disabled")}function h(aJ){return aG[b(aJ).closest("[date-cell-index]").attr("date-cell-index")]}function Q(aJ){return b(an[aJ])}function p(aJ){au.startField.val(aJ)}function aj(aJ){au.endField.val(aJ)}function G(aJ){return a.shortDateFormat(aJ,au.locale)}function o(aJ){b("span.startDateLabel",al).text(aJ)}function af(){return au.endField&&au.endField.length>0}}};b.fn.calendarRange=function(){return b(this).data("calendarRange")};b.fn.exists=function(){return this.length>0};b.fn.isEmpty=function(){return this.length==0}});