//>>built
require({cache:{"url:dojox/widget/Calendar/CalendarMonthYear.html":'<div class="dojoxCal-MY-labels" style="left: 0px;"\t\r\n\tdojoAttachPoint="myContainer" dojoAttachEvent="onclick: onClick">\r\n\t\t<table cellspacing="0" cellpadding="0" border="0" style="margin: auto;">\r\n\t\t\t\t<tbody>\r\n\t\t\t\t\t\t<tr class="dojoxCal-MY-G-Template">\r\n\t\t\t\t\t\t\t\t<td class="dojoxCal-MY-M-Template">\r\n\t\t\t\t\t\t\t\t\t\t<div class="dojoxCalendarMonthLabel"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td class="dojoxCal-MY-M-Template">\r\n\t\t\t\t\t\t\t\t\t\t<div class="dojoxCalendarMonthLabel"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td class="dojoxCal-MY-Y-Template">\r\n\t\t\t\t\t\t\t\t\t\t<div class="dojoxCalendarYearLabel"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t\t\t<td class="dojoxCal-MY-Y-Template">\r\n\t\t\t\t\t\t\t\t\t\t<div class="dojoxCalendarYearLabel"></div>\r\n\t\t\t\t\t\t\t\t</td>\r\n\t\t\t\t\t\t </tr>\r\n\t\t\t\t\t\t <tr class="dojoxCal-MY-btns">\r\n\t\t\t\t\t\t \t <td class="dojoxCal-MY-btns" colspan="4">\r\n\t\t\t\t\t\t \t\t <span class="dijitReset dijitInline dijitButtonNode ok-btn" dojoAttachEvent="onclick: onOk" dojoAttachPoint="okBtn">\r\n\t\t\t\t\t\t \t \t \t <button\tclass="dijitReset dijitStretch dijitButtonContents">OK</button>\r\n\t\t\t\t\t\t\t\t </span>\r\n\t\t\t\t\t\t\t\t <span class="dijitReset dijitInline dijitButtonNode cancel-btn" dojoAttachEvent="onclick: onCancel" dojoAttachPoint="cancelBtn">\r\n\t\t\t\t\t\t \t \t\t <button\tclass="dijitReset dijitStretch dijitButtonContents">Cancel</button>\r\n\t\t\t\t\t\t\t\t </span>\r\n\t\t\t\t\t\t \t </td>\r\n\t\t\t\t\t\t </tr>\r\n\t\t\t\t</tbody>\r\n\t\t</table>\r\n</div>\r\n'}});
define("dojox/widget/_CalendarMonthYearView","dojo/_base/declare,./_CalendarView,dijit/_TemplatedMixin,dojo/query,dojo/dom-class,dojo/_base/connect,dojo/_base/event,dojo/_base/lang,dojo/date/locale,dojo/text!./Calendar/CalendarMonthYear.html".split(","),function(k,l,m,f,d,j,i,h,n,o){return k("dojox.widget._CalendarMonthYearView",[l,m],{templateString:o,datePart:"year",displayedYears:10,useHeader:!1,postCreate:function(){this.cloneClass(".dojoxCal-MY-G-Template",5,".dojoxCal-MY-btns");this.monthContainer=
this.yearContainer=this.myContainer;f(".dojoxCalendarYearLabel",this.myContainer).forEach(function(a,b){var c="dojoxCalendarIncrease";switch(b){case 0:c="dojoxCalendarDecrease";case 1:d.remove(a,"dojoxCalendarYearLabel"),d.add(a,c)}});this._decBtn=f(".dojoxCalendarDecrease",this.myContainer)[0];this._incBtn=f(".dojoxCalendarIncrease",this.myContainer)[0];f(".dojoxCal-MY-M-Template",this.domNode).filter(function(a){return 1==a.cellIndex}).addClass("dojoxCal-MY-M-last");j.connect(this,"onBeforeDisplay",
h.hitch(this,function(){this._cachedDate=new Date(this.get("value").getTime());this._populateYears(this._cachedDate.getFullYear());this._populateMonths();this._updateSelectedMonth();this._updateSelectedYear()}));j.connect(this,"_populateYears",h.hitch(this,function(){this._updateSelectedYear()}));j.connect(this,"_populateMonths",h.hitch(this,function(){this._updateSelectedMonth()}));this._cachedDate=this.get("value");this._populateYears();this._populateMonths();this.addFx(".dojoxCalendarMonthLabel,.dojoxCalendarYearLabel ",
this.myContainer)},_setValueAttr:function(a){a&&a.getFullYear()&&this._populateYears(a.getFullYear())},getHeader:function(){return null},_getMonthNames:function(a){return this._monthNames=this._monthNames||n.getNames("months",a,"standAlone",this.getLang())},_populateMonths:function(){var a=this._getMonthNames("abbr");f(".dojoxCalendarMonthLabel",this.monthContainer).forEach(h.hitch(this,function(b,c){this._setText(b,a[c])}));var b=this.get("constraints");if(b){(new Date).setFullYear(this._year);var c=
-1,e=12;if(b.min){var g=b.min.getFullYear();g>this._year?c=12:g==this._year&&(c=b.min.getMonth())}b.max&&(g=b.max.getFullYear(),g<this._year?e=-1:g==this._year&&(e=b.max.getMonth()));f(".dojoxCalendarMonthLabel",this.monthContainer).forEach(h.hitch(this,function(a,b){d[b<c||b>e?"add":"remove"](a,"dijitCalendarDisabledDate")}))}this.getHeader()&&this._setText(this.getHeader(),this.get("value").getFullYear())},_populateYears:function(a){var b=this.get("constraints"),c=a||this.get("value").getFullYear(),
e=c-Math.floor(this.displayedYears/2),a=b&&b.min?b.min.getFullYear():e-1E4,e=Math.max(a,e);this._displayedYear=c;var c=f(".dojoxCalendarYearLabel",this.yearContainer),g=b&&b.max?b.max.getFullYear()-e:c.length;c.forEach(h.hitch(this,function(a,b){b<=g&&this._setText(a,e+b);d.toggle(a,"dijitCalendarDisabledDate",b>g)}));this._incBtn&&d.toggle(this._incBtn,"dijitCalendarDisabledDate",g<c.length);this._decBtn&&d.toggle(this._decBtn,"dijitCalendarDisabledDate",a>=e);this.getHeader()&&this._setText(this.getHeader(),
e+" - "+(e+11))},_updateSelectedYear:function(){this._year=""+(this._cachedDate||this.get("value")).getFullYear();this._updateSelectedNode(".dojoxCalendarYearLabel",h.hitch(this,function(a){return null!==this._year&&a.innerHTML==this._year}))},_updateSelectedMonth:function(){var a=(this._cachedDate||this.get("value")).getMonth();this._month=a;this._updateSelectedNode(".dojoxCalendarMonthLabel",function(b,c){return c==a})},_updateSelectedNode:function(a,b){f(a,this.domNode).forEach(function(a,c,f){d.toggle(a.parentNode,
"dijitCalendarSelectedDate",b(a,c,f))});var c=f(".dojoxCal-MY-M-Template div",this.myContainer).filter(function(a){return d.contains(a.parentNode,"dijitCalendarSelectedDate")})[0];c&&(c=d.contains(c,"dijitCalendarDisabledDate"),d.toggle(this.okBtn,"dijitDisabled",c))},onClick:function(a){function b(b){return d.contains(a.target,b)}if(b("dijitCalendarDisabledDate"))return i.stop(a),!1;if(b("dojoxCalendarMonthLabel"))this._month=a.target.parentNode.cellIndex+2*a.target.parentNode.parentNode.rowIndex,
this._cachedDate.setMonth(this._month),this._updateSelectedMonth();else if(b("dojoxCalendarYearLabel"))this._year=Number(a.target.innerHTML),this._cachedDate.setYear(this._year),this._populateMonths(),this._updateSelectedYear();else return b("dojoxCalendarDecrease")?this._populateYears(this._displayedYear-10):b("dojoxCalendarIncrease")&&this._populateYears(this._displayedYear+10),!0;i.stop(a);return!1},onOk:function(a){i.stop(a);if(d.contains(this.okBtn,"dijitDisabled"))return!1;this.onValueSelected(this._cachedDate);
return!1},onCancel:function(a){i.stop(a);this.onValueSelected(this.get("value"));return!1}})});