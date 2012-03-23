define([
	"dojo/_base/declare",
	"dojo/_base/array",
	"dojo/_base/lang",
	"dojo/_base/Deferred",
	"dojo/DeferredList",
	"./model/Model",
	"./Row",
	"./Column",
	"./Cell",
	"./_Module"
], function(declare, array, lang, Deferred, DeferredList, Model, Row, Column, Cell, _Module){	

	var delegate = lang.delegate,
		isFunc = lang.isFunction,
		hitch = lang.hitch,
		forEach = array.forEach;

	function shallowCopy(obj){
		var ret = {}, i;
		for(i in obj){
			ret[i] = obj[i];
		}
		return ret;
	}

	function getDepends(mod){
		var p = mod.moduleClass.prototype;
		return (p.forced || []).concat(p.optional || []);
	}

	function configColumns(columns){
		var cs = {}, c, i, len;
		if(lang.isArray(columns)){
			for(i = 0, len = columns.length; i < len; ++i){
				c = columns[i];
				c.index = i;
				c.id = c.id || String(i + 1);
				cs[c.id] = c;
			}
		}
		return cs;
	}
	
	function mixinArrayUtils(arr){
		for(var f in array){
			if(isFunc(array[f])){
				arr[f] = lang.partial(array[f], arr);
			}
		}
		return arr;
	}

	function mixinAPI(base, apiPath){
		if(apiPath){
			for(var path in apiPath){
				var bp = base[path],
					ap = apiPath[path];
				if(bp && lang.isObject(bp) && !isFunc(bp)){
					mixinAPI(bp, ap);
				}else{
					base[path] = ap;
				}
			}
		}
	}

	function removeAPI(base, apiPath){
		if(apiPath){
			for(var path in apiPath){
				delete base[path];
			}
		}
	}

	function normalizeModules(args, coreMods){
		var mods = [],
			coreModCount = coreMods && coreMods.length || 0;
		forEach(args.modules, function(m, i){
			if(isFunc(m)){
				mods.push({
					moduleClass: m
				});
			}else if(!m){
				console.error(["The ", (i + 1 - coreModCount), 
					"-th declared module can NOT be found, please require it before using it"].join(''));
			}else if(!isFunc(m.moduleClass)){
				console.error(["The ", (i + 1 - coreModCount), 
					"-th declared module has NO moduleClass, please provide it"].join(''));
			}else{
				mods.push(m);
			}
		});
		args.modules = mods;
		return args;
	}
	
	function checkForced(args){
		var registeredMods = _Module._modules,
			modules = args.modules, i, j, k, p, deps, depName;
		for(i = 0; i < modules.length; ++i){
			p = modules[i].moduleClass.prototype;
			deps = (p.forced || []).concat(p.required || []);
			for(j = 0; j < deps.length; ++j){
				depName = deps[j];
				for(k = modules.length - 1; k >= 0; --k){
					if(modules[k].moduleClass.prototype.name === depName){
						break;
					}
				}
				if(k < 0){
					if(registeredMods[depName]){
						modules.push({
							moduleClass: registeredMods[depName]
						});
					}else{
						throw new Error(["Forced/Required Dependent Module '", depName, 
							"' is NOT Found for '", p.name, "'"].join(''));
					}
				}
			}
		}
		return args;
	}

	function removeDuplicate(args){
		var i, mods = {}, modules = [];
		forEach(args.modules, function(m){
			mods[m.moduleClass.prototype.name] = m;
		});
		for(i in mods){
			modules.push(mods[i]);
		}
		args.modules = modules;
		return args;
	}

	function checkCircle(args){
		var modules = args.modules, i, m, modName, q, key,
			getModule = function(modName){
				for(var j = modules.length - 1; j >= 0; --j){
					if(modules[j].moduleClass.prototype.name == modName){
						return modules[j];
					}
				}
				return null;
			};
		for(i = modules.length - 1; m = modules[i]; --i){
			modName = m.moduleClass.prototype.name;
			q = getDepends(m);
			while(q.length){
				key = q.shift();
				if(key == modName){
					throw new Error("Module '" + key + "' is in a dependancy circle!");
				}
				m = getModule(key);
				if(m){
					q = q.concat(getDepends(m));
				}
			}
		}
		return args;
	}

	function checkModelExtensions(args){
		var modules = args.modules,
			i, modExts;
		for(i = modules.length - 1; i >= 0; --i){
			modExts = modules[i].moduleClass.prototype.modelExtensions;
			if(modExts){
				[].push.apply(args.modelExtensions, modExts);
			}
		}
		return args;
	}

	return declare([], {
		_reset: function(args){
			// summary:
			//		Reset the grid data model completely. Also used in initialization.
			var t = this;
			t._uninit();
			args = shallowCopy(args);
			t.store = args.store;
			args.modules = args.modules || [];
			args.modelExtensions = args.modelExtensions || [];
			t.setColumns(args.structure);
			args.columns = t._columnsById;
			args = checkModelExtensions(
					checkCircle(
						removeDuplicate(
							checkForced(
								normalizeModules(args, t.coreModules)))));
			//Create model before module creation, so that all modules can use the logic grid from very beginning.
			t.model = new Model(args);
			t._create(args);
		},

		_postCreate: function(){
			var t = this,
				d = t._deferStartup = new Deferred;
			t._preload();
			t._load(d).then(hitch(t, t.onModulesLoaded));
		},

		onModulesLoaded: function(){},

		setStore: function(store){
			var t = this;
			t.store = store;
			t._reset(t);
			t._postCreate();
			t._deferStartup.callback();
		},

		setColumns: function(columns){
			var t = this;
			t.structure = columns;
			t._columns = lang.clone(columns);
			t._columnsById = configColumns(t._columns);
			if(t.model){
				t.model._cache.onSetColumns(t._columnsById);
			}
		},

		row: function(rowIndexOrId, isId){
			var t = this, id = rowIndexOrId;
			if(typeof id == "number" && !isId){
				id = t.model.indexToId(id);
			}
			if(t.model.idToIndex(id) >= 0){
				t._rowObj = t._rowObj || t._mixin(new Row(t), "row");
				return delegate(t._rowObj, {id: id});
			}
			return null;
		},

		column: function(columnIndexOrId, isId){
			var t = this, id = columnIndexOrId, c, a, obj = {};
			if(typeof id == "number" && !isId){
				c = t._columns[id];
				id = c && c.id;
			}
			c = t._columnsById[id];
			if(c){
				t._colObj = t._colObj || t._mixin(new Column(t), "column");
				for(a in c){
					if(t._colObj[a] === undefined){
						obj[a] = c[a];
					}
				}
				return delegate(t._colObj, obj);
			}
			return null;
		},

		cell: function(rowIndexOrId, columnIndexOrId, isId){
			var t = this, r = rowIndexOrId instanceof Row ? rowIndexOrId : t.row(rowIndexOrId, isId);
			if(r){
				var c = columnIndexOrId instanceof Column ? columnIndexOrId : t.column(columnIndexOrId, isId);
				if(c){
					t._cellObj = t._cellObj || t._mixin(new Cell(t), "cell");
					return delegate(t._cellObj, {row: r, column: c});
				}
			}
			return null;
		},

		columnCount: function(){
			return this._columns.length;
		},

		rowCount: function(parentId){
			return this.model.size(parentId);
		},

		columns: function(start, count){
			return this._arr(this._columns.length, 'column', start, count);
		},

		rows: function(start, count){
			return this._arr(this.model.size(), 'row', start, count);
		},
		
		//Private-------------------------------------------------------------------------------------
		_uninit: function(){
			var t = this, mods = t._modules, m;
			for(m in mods){
				m = mods[m].mod;
				if(m.getAPIPath){
					removeAPI(t, m.getAPIPath());
				}
				m.destroy();
			}
			if(t.model){
				t.model.destroy();
			}
		},

		_arr: function(total, type, start, count){
			var i = start || 0, end = count >= 0 ? start + count : total, r = [];
			for(; i < end && i < total; ++i){
				r.push(this[type](i));
			}
			return mixinArrayUtils(r);
		},
		
		_preload: function(){
			var m, mods = this._modules;
			for(m in mods){
				m = mods[m];
				if(m.mod.preload){
					m.mod.preload(m.args);
				}
			}
		},

		_load: function(deferredStartup){
			var dl = [], m;
			for(m in this._modules){
				dl.push(this._initMod(deferredStartup, m));
			}
			return new DeferredList(dl, 0, 1);
		},
		
		_mixin: function(component, name){
			var m, a, mods = this._modules;
			for(m in mods){
				m = mods[m].mod;
				a = m[name + 'Mixin'];
				if(isFunc(a)){
					a = a.apply(m);
				}
				lang.mixin(component, a || {});
			}
			return component;
		},
	
		_create: function(args){
			var t = this,
				mods = t._modules = {};
			forEach(args.modules, function(mod){
				var m, key = mod.moduleClass.prototype.name;
				if(!mods[key]){
					mods[key] = {
						args: mod,
						mod: m = new mod.moduleClass(t, mod),
						deps: getDepends(mod)
					};
					if(m.getAPIPath){
						mixinAPI(t, m.getAPIPath());
					}
				}
			});
		},

		_initMod: function(deferredStartup, key){
			var t = this,
				mods = t._modules,
				m = mods[key],
				mod = m.mod,
				d = mod.loaded;
			if(!m.done){
				m.done = 1;
				new DeferredList(array.map(array.filter(m.deps, function(depModName){
					return mods[depModName];
				}), hitch(t, t._initMod, deferredStartup)), 0, 1).then(function(){
					if(mod.load){
						mod.load(m.args, deferredStartup);
					}else if(d.fired < 0){
						d.callback();
					}
				});
			}
			return d;
		}
	});
});
