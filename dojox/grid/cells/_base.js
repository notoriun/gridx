//>>built
define("dojox/grid/cells/_base","dojo/_base/kernel,dojo/_base/declare,dojo/_base/lang,dojo/_base/event,dojo/_base/connect,dojo/_base/array,dojo/_base/sniff,dojo/dom,dojo/dom-attr,dojo/dom-construct,dijit/_Widget,../util".split(","),function(p,f,e,q,r,s,m,n,g,t,u,j){var v=f("dojox.grid._DeferredTextWidget",u,{deferred:null,_destroyOnRemove:!0,postCreate:function(){this.deferred&&this.deferred.addBoth(e.hitch(this,function(a){if(this.domNode)this.domNode.innerHTML=a}))}}),o=function(){setTimeout(e.hitch.apply(p,
arguments),0)},i=f("dojox.grid.cells._Base",null,{styles:"",classes:"",editable:!1,alwaysEditing:!1,formatter:null,defaultValue:"...",value:null,hidden:!1,noresize:!1,draggable:!0,_valueProp:"value",_formatPending:!1,constructor:function(a){this._props=a||{};e.mixin(this,a);if(void 0===this.draggable)this.draggable=!0},_defaultFormat:function(a,b){var k;var c=this.grid.formatterScope||this,d=this.formatter;if(d&&c&&"string"==typeof d)k=this.formatter=c[d],d=k;c=a!=this.defaultValue&&d?d.apply(c,b):
a;if("undefined"==typeof c)return this.defaultValue;c&&c.addBoth&&(c=new v({deferred:c},t.create("span",{innerHTML:this.defaultValue})));return c&&c.declaredClass&&c.startup?"<div class='dojoxGridStubNode' linkWidget='"+c.id+"' cellIdx='"+this.index+"'>"+this.defaultValue+"</div>":c},format:function(a,b){var c=this.grid.edit.info,d=this.get?this.get(a,b):this.value||this.defaultValue,d=d&&d.replace&&this.grid.escapeHTMLInData?d.replace(/&/g,"&amp;").replace(/</g,"&lt;"):d;return this.editable&&(this.alwaysEditing||
c.rowIndex==a&&c.cell==this)?this.formatEditing(d,a):this._defaultFormat(d,[d,a,this])},formatEditing:function(){},getNode:function(a){return this.view.getCellNode(a,this.index)},getHeaderNode:function(){return this.view.getHeaderCellNode(this.index)},getEditNode:function(a){return(this.getNode(a)||0).firstChild||0},canResize:function(){var a=this.unitWidth;return a&&"auto"!==a},isFlex:function(){var a=this.unitWidth;return a&&e.isString(a)&&("auto"==a||"%"==a.slice(-1))},applyEdit:function(a,b){this.getNode(b)&&
this.grid.edit.applyCellEdit(a,this,b)},cancelEdit:function(a){this.grid.doCancelEdit(a)},_onEditBlur:function(a){this.grid.edit.isEditCell(a,this.index)&&this.grid.edit.apply()},registerOnBlur:function(a,b){this.commitOnBlur&&r.connect(a,"onblur",function(){setTimeout(e.hitch(this,"_onEditBlur",b),250)})},needFormatNode:function(a,b){this._formatPending=!0;o(this,"_formatNode",a,b)},cancelFormatNode:function(){this._formatPending=!1},_formatNode:function(a,b){if(this._formatPending)this._formatPending=
!1,m("ie")||n.setSelectable(this.grid.domNode,!0),this.formatNode(this.getEditNode(b),a,b)},formatNode:function(a,b,c){m("ie")?o(this,"focus",c,a):this.focus(c,a)},dispatchEvent:function(a,b){if(a in this)return this[a](b)},getValue:function(a){return this.getEditNode(a)[this._valueProp]},setValue:function(a,b){var c=this.getEditNode(a);c&&(c[this._valueProp]=b)},focus:function(a,b){var c=b||this.getEditNode(a);try{j.fire(c,"focus"),j.fire(c,"select")}catch(d){}},save:function(a){this.value=this.value||
this.getValue(a)},restore:function(a){this.setValue(a,this.value)},_finish:function(){n.setSelectable(this.grid.domNode,!1);this.cancelFormatNode()},apply:function(a){this.applyEdit(this.getValue(a),a);this._finish(a)},cancel:function(a){this.cancelEdit(a);this._finish(a)}});i.markupFactory=function(a,b){var c=e.trim(g.get(a,"formatter")||"");if(c)b.formatter=e.getObject(c)||c;if(c=e.trim(g.get(a,"get")||""))b.get=e.getObject(c);c=function(b,c,k){var f=e.trim(g.get(a,b)||"");f&&(c[k||b]="false"!=
f.toLowerCase())};c("sortDesc",b);c("editable",b);c("alwaysEditing",b);c("noresize",b);c("draggable",b);if(c=e.trim(g.get(a,"loadingText")||g.get(a,"defaultValue")||""))b.defaultValue=c;c=function(b,c,k){var f=e.trim(g.get(a,b)||"")||void 0;f&&(c[k||b]=f)};c("styles",b);c("headerStyles",b);c("cellStyles",b);c("classes",b);c("headerClasses",b);c("cellClasses",b)};var h=f("dojox.grid.cells.Cell",i,{constructor:function(){this.keyFilter=this.keyFilter},keyFilter:null,formatEditing:function(a,b){this.needFormatNode(a,
b);return'<input class="dojoxGridInput" type="text" value="'+a+'">'},formatNode:function(a,b,c){this.inherited(arguments);this.registerOnBlur(a,c)},doKey:function(a){this.keyFilter&&-1==String.fromCharCode(a.charCode).search(this.keyFilter)&&q.stop(a)},_finish:function(a){this.inherited(arguments);var b=this.getEditNode(a);try{j.fire(b,"blur")}catch(c){}}});h.markupFactory=function(a,b){i.markupFactory(a,b);var c=e.trim(g.get(a,"keyFilter")||"");if(c)b.keyFilter=RegExp(c)};f("dojox.grid.cells.RowIndex",
h,{name:"Row",postscript:function(){this.editable=!1},get:function(a){return a+1}}).markupFactory=function(a,b){h.markupFactory(a,b)};f("dojox.grid.cells.Select",h,{options:null,values:null,returnIndex:-1,constructor:function(){this.values=this.values||this.options},formatEditing:function(a,b){this.needFormatNode(a,b);for(var c=['<select class="dojoxGridSelect">'],d=0,e,f;void 0!==(e=this.options[d])&&void 0!==(f=this.values[d]);d++)f=f.replace?f.replace(/&/g,"&amp;").replace(/</g,"&lt;"):f,e=e.replace?
e.replace(/&/g,"&amp;").replace(/</g,"&lt;"):e,c.push("<option",a==f?" selected":"",' value="'+f+'"',">",e,"</option>");c.push("</select>");return c.join("")},_defaultFormat:function(a,b){var c=this.inherited(arguments);if(!this.formatter&&this.values&&this.options){var d=s.indexOf(this.values,c);0<=d&&(c=this.options[d])}return c},getValue:function(a){var b=this.getEditNode(a);if(b)return a=b.selectedIndex,b=b.options[a],-1<this.returnIndex?a:b.value||b.innerHTML}}).markupFactory=function(a,b){h.markupFactory(a,
b);var c=e.trim(g.get(a,"options")||"");if(c){var d=c.split(",");if(d[0]!=c)b.options=d}if(c=e.trim(g.get(a,"values")||""))if(d=c.split(","),d[0]!=c)b.values=d};var l=f("dojox.grid.cells.AlwaysEdit",h,{alwaysEditing:!0,_formatNode:function(a,b){this.formatNode(this.getEditNode(b),a,b)},applyStaticValue:function(a){var b=this.grid.edit;b.applyCellEdit(this.getValue(a),this,a);b.start(this,a,!0)}});l.markupFactory=function(a,b){h.markupFactory(a,b)};f("dojox.grid.cells.Bool",l,{_valueProp:"checked",
formatEditing:function(a){return'<input class="dojoxGridInput" type="checkbox"'+(a?' checked="checked"':"")+' style="width: auto" />'},doclick:function(a){"INPUT"==a.target.tagName&&this.applyStaticValue(a.rowIndex)}}).markupFactory=function(a,b){l.markupFactory(a,b)};return i});