//>>built
define("dijit/_editor/plugins/TextColor","require,dojo/colors,dojo/_base/declare,dojo/_base/lang,../_Plugin,../../form/DropDownButton".split(","),function(g,h,i,j,c,k){var f=i("dijit._editor.plugins.TextColor",c,{buttonClass:k,useDefaultCommand:!1,_initButton:function(){this.inherited(arguments);var b=this;this.button.loadDropDown=function(d){g(["../../ColorPalette"],j.hitch(this,function(e){this.dropDown=new e({ownerDocument:b.editor.ownerDocument,value:b.value,onChange:function(a){b.editor.execCommand(b.command,
a)}});d()}))}},updateState:function(){var b=this.editor,d=this.command;if(b&&b.isLoaded&&d.length){if(this.button){var e=this.get("disabled");this.button.set("disabled",e);if(e)return;var a;try{a=b.queryCommandValue(d)||""}catch(c){a=""}}""==a&&(a="#000000");"transparent"==a&&(a="#ffffff");"string"==typeof a?-1<a.indexOf("rgb")&&(a=h.fromRgb(a).toHex()):(a=((a&255)<<16|a&65280|(a&16711680)>>>16).toString(16),a="#000000".slice(0,7-a.length)+a);this.value=a;(b=this.button.dropDown)&&a!==b.get("value")&&
b.set("value",a,!1)}}});c.registry.foreColor=function(){return new f({command:"foreColor"})};c.registry.hiliteColor=function(){return new f({command:"hiliteColor"})};return f});