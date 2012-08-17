//>>built
require({cache:{"url:dijit/layout/templates/_TabButton.html":'<div role="presentation" data-dojo-attach-point="titleNode,innerDiv,tabContent" class="dijitTabInner dijitTabContent">\r\n\t<img src="${_blankGif}" alt="" class="dijitIcon dijitTabButtonIcon" data-dojo-attach-point=\'iconNode\'/>\r\n\t<span data-dojo-attach-point=\'containerNode,focusNode\' class=\'tabLabel\'></span>\r\n\t<span class="dijitInline dijitTabCloseButton dijitTabCloseIcon" data-dojo-attach-point=\'closeNode\'\r\n\t\t  role="presentation">\r\n\t\t<span data-dojo-attach-point=\'closeText\' class=\'dijitTabCloseText\'>[x]</span\r\n\t\t\t\t></span>\r\n</div>\r\n'}});
define("dijit/layout/TabController","dojo/_base/declare,dojo/dom,dojo/dom-attr,dojo/dom-class,dojo/i18n,dojo/_base/lang,./StackController,../registry,../Menu,../MenuItem,dojo/text!./templates/_TabButton.html,dojo/i18n!../nls/common".split(","),function(b,h,d,e,f,i,g,j,k,l,c){c=b("dijit.layout._TabButton",g.StackButton,{baseClass:"dijitTab",cssStateNodes:{closeNode:"dijitTabCloseButton"},templateString:c,scrollOnFocus:!1,buildRendering:function(){this.inherited(arguments);h.setSelectable(this.containerNode,
!1)},startup:function(){this.inherited(arguments);var a=this.domNode;this.defer(function(){a.className=a.className},1)},_setCloseButtonAttr:function(a){this._set("closeButton",a);e.toggle(this.domNode,"dijitClosable",a);this.closeNode.style.display=a?"":"none";a&&(a=f.getLocalization("dijit","common"),this.closeNode&&d.set(this.closeNode,"title",a.itemClose))},_setDisabledAttr:function(a){this.inherited(arguments);if(this.closeNode)if(a)d.remove(this.closeNode,"title");else{var b=f.getLocalization("dijit",
"common");d.set(this.closeNode,"title",b.itemClose)}},_setLabelAttr:function(a){this.inherited(arguments);if(!this.showLabel&&!this.params.title)this.iconNode.alt=i.trim(this.containerNode.innerText||this.containerNode.textContent||"")}});b=b("dijit.layout.TabController",g,{baseClass:"dijitTabController",templateString:"<div role='tablist' data-dojo-attach-event='onkeypress:onkeypress'></div>",tabPosition:"top",buttonWidget:c,buttonWidgetCloseClass:"dijitTabCloseButton",postCreate:function(){this.inherited(arguments);
var a=new k({id:this.id+"_Menu",ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,targetNodeIds:[this.domNode],selector:function(a){return e.contains(a,"dijitClosable")&&!e.contains(a,"dijitTabDisabled")}});this.own(a);var b=f.getLocalization("dijit","common"),c=this;a.addChild(new l({label:b.itemClose,ownerDocument:this.ownerDocument,dir:this.dir,lang:this.lang,textDir:this.textDir,onClick:function(){var a=j.byNode(this.getParent().currentTarget);c.onCloseButtonClick(a.page)}}))}});
b.TabButton=c;return b});