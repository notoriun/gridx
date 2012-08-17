//>>built
define("dojox/sql/_base",["dijit","dojo","dojox","dojo/require!dojox/sql/_crypto"],function(j,g,f){g.provide("dojox.sql._base");g.require("dojox.sql._crypto");g.mixin(f.sql,{dbName:null,debug:g.exists("dojox.sql.debug")?f.sql.debug:!1,open:function(a){if(!this._dbOpen||a&&a!=this.dbName){if(!this.dbName&&(this.dbName="dot_store_"+window.location.href.replace(/[^0-9A-Za-z_]/g,"_"),63<this.dbName.length))this.dbName=this.dbName.substring(0,63);if(!a)a=this.dbName;try{this._initDb(),this.db.open(a),
this._dbOpen=!0}catch(b){throw b.message||b;}}},close:function(a){if(!(g.isIE||!this._dbOpen&&(!a||a==this.dbName))){if(!a)a=this.dbName;try{this.db.close(a),this._dbOpen=!1}catch(b){throw b.message||b;}}},_exec:function(a){try{this._initDb();if(!this._dbOpen)this.open(),this._autoClose=!0;var b=null,c=null,d=null,e=g._toArray(a),b=e.splice(0,1)[0];if(this._needsEncrypt(b)||this._needsDecrypt(b))c=e.splice(e.length-1,1)[0],d=e.splice(e.length-1,1)[0];this.debug&&this._printDebugSQL(b,e);if(this._needsEncrypt(b))return new f.sql._SQLCrypto("encrypt",
b,d,e,c),null;if(this._needsDecrypt(b))return new f.sql._SQLCrypto("decrypt",b,d,e,c),null;var h=this.db.execute(b,e),h=this._normalizeResults(h);this._autoClose&&this.close();return h}catch(i){i=i.message||i;if(this._autoClose)try{this.close()}catch(l){}throw i;}},_initDb:function(){if(!this.db)try{this.db=google.gears.factory.create("beta.database","1.0")}catch(a){g.setObject("google.gears.denied",!0);if(f.off)f.off.onFrameworkEvent("coreOperationFailed");throw"Google Gears must be allowed to run";
}},_printDebugSQL:function(a,b){for(var c=0;c<b.length;c++);},_normalizeResults:function(a){var b=[];if(!a)return[];for(;a.isValidRow();){for(var c={},d=0;d<a.fieldCount();d++){var e=a.fieldName(d),f=a.field(d);c[e]=f}b.push(c);a.next()}a.close();return b},_needsEncrypt:function(a){return/encrypt\([^\)]*\)/i.test(a)},_needsDecrypt:function(a){return/decrypt\([^\)]*\)/i.test(a)}});g.declare("dojox.sql._SQLCrypto",null,{constructor:function(a,b,c,d,e){"encrypt"==a?this._execEncryptSQL(b,c,d,e):this._execDecryptSQL(b,
c,d,e)},_execEncryptSQL:function(a,b,c,d){var e=this._stripCryptoSQL(a),h=this._flagEncryptedArgs(a,c),i=this;this._encrypt(e,b,c,h,function(c){var h=[],g=null;try{h=f.sql.db.execute(e,c)}catch(k){g=k.message||k}if(null!=g){if(f.sql._autoClose)try{f.sql.close()}catch(j){}d(null,!0,g.toString())}else h=f.sql._normalizeResults(h),f.sql._autoClose&&f.sql.close(),f.sql._needsDecrypt(a)?(c=i._determineDecryptedColumns(a),i._decrypt(h,c,b,function(a){d(a,!1,null)})):d(h,!1,null)})},_execDecryptSQL:function(a,
b,c,d){var e=this._stripCryptoSQL(a),a=this._determineDecryptedColumns(a),h=[],i=null;try{h=f.sql.db.execute(e,c)}catch(g){i=g.message||g}if(null!=i){if(f.sql._autoClose)try{f.sql.close()}catch(j){}d(h,!0,i.toString())}else h=f.sql._normalizeResults(h),f.sql._autoClose&&f.sql.close(),this._decrypt(h,a,b,function(a){d(a,!1,null)})},_encrypt:function(a,b,c,d,e){this._finishedCrypto=this._totalCrypto=0;this._finishedSpawningCrypto=!1;this._finalArgs=c;for(a=0;a<c.length;a++)if(d[a]){var h=c[a],i=a;this._totalCrypto++;
f.sql._crypto.encrypt(h,b,g.hitch(this,function(a){this._finalArgs[i]=a;this._finishedCrypto++;this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto&&e(this._finalArgs)}))}this._finishedSpawningCrypto=!0},_decrypt:function(a,b,c,d){this._finishedCrypto=this._totalCrypto=0;this._finishedSpawningCrypto=!1;this._finalResultSet=a;for(var e=0;e<a.length;e++){var f=a[e],g;for(g in f)if("*"==b||b[g])this._totalCrypto++,this._decryptSingleColumn(g,f[g],c,e,function(a){d(a)})}this._finishedSpawningCrypto=
!0},_stripCryptoSQL:function(a){var a=a.replace(/DECRYPT\(\*\)/ig,"*"),b=a.match(/ENCRYPT\([^\)]*\)/ig);if(null!=b)for(var c=0;c<b.length;c++)var d=b[c],e=d.match(/ENCRYPT\(([^\)]*)\)/i)[1],a=a.replace(d,e);b=a.match(/DECRYPT\([^\)]*\)/ig);if(null!=b)for(c=0;c<b.length;c++)d=b[c],e=d.match(/DECRYPT\(([^\)]*)\)/i)[1],a=a.replace(d,e);return a},_flagEncryptedArgs:function(a){for(var b=RegExp(/([\"][^\"]*\?[^\"]*[\"])|([\'][^\']*\?[^\']*[\'])|(\?)/ig),c=0,d=[];null!=b.exec(a);)if(!/^[\"\']/.test(RegExp.lastMatch+
"")){var e=!1;/ENCRYPT\([^\)]*$/i.test(RegExp.leftContext)&&(e=!0);d[c]=e;c++}return d},_determineDecryptedColumns:function(a){var b={};if(/DECRYPT\(\*\)/i.test(a))b="*";else for(var c=/DECRYPT\((?:\s*\w*\s*\,?)*\)/ig,d=c.exec(a);d;)d=(new String(RegExp.lastMatch)).replace(/DECRYPT\(/i,""),d=d.replace(/\)/,""),d=d.split(/\s*,\s*/),g.forEach(d,function(a){/\s*\w* AS (\w*)/i.test(a)&&(a=a.match(/\s*\w* AS (\w*)/i)[1]);b[a]=!0}),d=c.exec(a);return b},_decryptSingleColumn:function(a,b,c,d,e){f.sql._crypto.decrypt(b,
c,g.hitch(this,function(b){this._finalResultSet[d][a]=b;this._finishedCrypto++;this._finishedCrypto>=this._totalCrypto&&this._finishedSpawningCrypto&&e(this._finalResultSet)}))}});(function(){var a=f.sql;f.sql=new Function("return dojox.sql._exec(arguments);");g.mixin(f.sql,a)})()});