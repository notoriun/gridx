//>>built
define("dojo/robotx","doh/main,./aspect,./dom-construct,./dom-style,./_base/kernel,./_base/lang,./on,./ready,./robot,./sniff,./_base/window".split(","),function(j,p,q,f,c,r,k,s,b,l,m){c.experimental("dojo.robotx");var a=null;c.config.debugHeight=c.config.debugHeight||200;var g,t=p.after(j,"_groupStarted",function(){t.remove();a.style.visibility="visible";a.style.visibility="visible"},!0),h,n=function(d){s(function(){var b={overflow:l("webkit")?"hidden":"visible",margin:"0px",borderWidth:"0px",height:"100%",
width:"100%"};f.set(document.documentElement,b);f.set(document.body,b);a=document.createElement("iframe");a.src=d;a.setAttribute("ALLOWTRANSPARENCY","true");a.scrolling=l("ie")?"yes":"auto";var b="BackCompat"==document.compatMode?document.body:document.documentElement,c=(document.getElementById("firebug")||{}).offsetHeight||0;f.set(a,{visibility:"hidden",border:"0px none",padding:"0px",margin:"0px",width:"100%",height:c?b.clientHeight-c+"px":"100%"});void 0!==a.attachEvent?a.attachEvent("onload",
h):k(a,"load",h);q.place(a,m.body(),"first")})},o=!1,i=null,u=b._run;b._run=function(a){o=!0;i=a;b._run=u;g&&n(g)};var e=function(){b._updateDocument();e=null;a.contentWindow.require?a.contentWindow.require(["dojo/ready"],function(a){a(999,function(){b._run(i)})}):b._run(i)};h=function(){e&&e();var a=k(m.body(),"onunload",function(){c.setContext(window,document);a.remove()})};r.mixin(b,{_updateDocument:function(){c.setContext(a.contentWindow,a.contentWindow.document);b.window=a.contentWindow;b.doc=
a.contentWindow.document;var d=c.global;if(d.dojo)c.publish=d.dojo.publish,c.subscribe=d.dojo.subscribe,c.connectPublisher=d.dojo.connectPublisher},initRobot:function(a){o?n(a):g=a},waitForPageToLoad:function(a){var c=new j.Deferred;e=function(){e=null;b._updateDocument();c.callback(!0)};a();return c}});return b});