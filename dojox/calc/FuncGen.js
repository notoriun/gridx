//>>built
require({cache:{"url:dojox/calc/templates/FuncGen.html":'<div style="border:1px solid black;">\r\n\t<select data-dojo-type="dijit.form.ComboBox" placeholder="functionName" data-dojo-attach-point=\'combo\' style="width:45%;" class="dojoxCalcFuncGenNameBox" data-dojo-attach-event=\'onChange:onSelect\'></select>\r\n\t<input data-dojo-type="dijit.form.TextBox" placeholder="arguments" class="dojoxCalcFuncGenTextBox" style="width:50%;" data-dojo-attach-point=\'args\' />\r\n\t<BR>\r\n\t<TEXTAREA data-dojo-type="dijit.form.SimpleTextarea" placeholder="function body" class="dojoxCalcFuncGenTextArea" style="text-align:left;width:95%;" rows=10 data-dojo-attach-point=\'textarea\' value="" data-dojo-attach-event=\'onClick:readyStatus\'></TEXTAREA>\r\n\t<BR>\r\n\t<input data-dojo-type="dijit.form.Button" class="dojoxCalcFuncGenSave" data-dojo-attach-point=\'saveButton\' label="Save" data-dojo-attach-event=\'onClick:onSaved\' />\r\n\t<input data-dojo-type="dijit.form.Button" class="dojoxCalcFuncGenReset" data-dojo-attach-point=\'resetButton\' label="Reset" data-dojo-attach-event=\'onClick:onReset\' />\r\n\t<input data-dojo-type="dijit.form.Button" class="dojoxCalcFuncGenClear" data-dojo-attach-point=\'clearButton\' label="Clear" data-dojo-attach-event=\'onClick:onClear\' />\r\n\t<input data-dojo-type="dijit.form.Button" class="dojoxCalcFuncGenClose" data-dojo-attach-point=\'closeButton\' label="Close" />\r\n\t<BR><BR>\r\n\t<input data-dojo-type="dijit.form.Button" class="dojoxCalcFuncGenDelete" data-dojo-attach-point=\'deleteButton\' label="Delete" data-dojo-attach-event=\'onClick:onDelete\' />\r\n\t<BR>\r\n\t<input data-dojo-type="dijit.form.TextBox" style="width:45%;" data-dojo-attach-point=\'status\' class="dojoxCalcFuncGenStatusTextBox" readonly value="Ready" />\r\n</div>\r\n'}});
define("dojox/calc/FuncGen","dojo/_base/declare,dojo/_base/lang,dojo/dom-style,dijit/_WidgetBase,dijit/_WidgetsInTemplateMixin,dijit/_TemplatedMixin,dojox/math/_base,dijit/registry,dojo/text!./templates/FuncGen.html,dojox/calc/_Executor,dijit/form/ComboBox,dijit/form/SimpleTextarea,dijit/form/Button,dijit/form/TextBox".split(","),function(b,c,d,e,f,g,k,h,i,j){b=b("dojox.calc.FuncGen",[e,g,f],{templateString:i,onSelect:function(){this.reset()},onClear:function(){confirm("Do you want to clear the name, argument, and body text?")&&
this.clear()},saveFunction:function(){},onSaved:function(){},clear:function(){this.textarea.set("value","");this.args.set("value","");this.combo.set("value","")},reset:function(){this.combo.get("value")in this.functions&&(this.textarea.set("value",this.functions[this.combo.get("value")].body),this.args.set("value",this.functions[this.combo.get("value")].args))},onReset:function(){this.combo.get("value")in this.functions&&confirm("Do you want to reset this function?")&&(this.reset(),this.status.set("value",
"The function has been reset to its last save point."))},deleteThing:function(a){this.writeStore.isItem(a)&&(this.writeStore.deleteItem(a),this.writeStore.save())},deleteFunction:function(){},onDelete:function(){var a;(a=this.combo.get("value"))in this.functions?confirm("Do you want to delete this function?")&&(this.writeStore.deleteItem(this.combo.item),this.writeStore.save(),this.deleteFunction(a),delete this.functions[a],this.clear()):this.status.set("value","Function cannot be deleted, it isn't saved.")},
readyStatus:function(){this.status.set("value","Ready")},writeStore:null,readStore:null,functions:null,startup:function(){this.combo.set("store",this.writeStore);this.inherited(arguments);var a=h.getEnclosingWidget(this.domNode.parentNode);a&&"function"==typeof a.close?this.closeButton.set("onClick",c.hitch(a,"close")):d.set(this.closeButton.domNode,{display:"none"})}});return c.mixin(j,{FuncGen:b})});