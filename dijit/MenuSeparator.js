//>>built
require({cache:{"url:dijit/templates/MenuSeparator.html":'<tr class="dijitMenuSeparator">\r\n\t<td class="dijitMenuSeparatorIconCell">\r\n\t\t<div class="dijitMenuSeparatorTop"></div>\r\n\t\t<div class="dijitMenuSeparatorBottom"></div>\r\n\t</td>\r\n\t<td colspan="3" class="dijitMenuSeparatorLabelCell">\r\n\t\t<div class="dijitMenuSeparatorTop dijitMenuSeparatorLabel"></div>\r\n\t\t<div class="dijitMenuSeparatorBottom"></div>\r\n\t</td>\r\n</tr>'}});
define("dijit/MenuSeparator","dojo/_base/declare,dojo/dom,./_WidgetBase,./_TemplatedMixin,./_Contained,dojo/text!./templates/MenuSeparator.html".split(","),function(a,b,c,d,e,f){return a("dijit.MenuSeparator",[c,d,e],{templateString:f,buildRendering:function(){this.inherited(arguments);b.setSelectable(this.domNode,!1)},isFocusable:function(){return!1}})});