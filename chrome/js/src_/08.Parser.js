var Parser = function(ui) {
	var api = {}, elements, stats,
	getStylesheets = function() {
		if(document && document.styleSheets) {
			var processSelector = function(selector) {
				var clss;
				if(selector && selector != '') {
					clss = selector.split(' ');
					for(var i=0; i<clss.length; i++) {
						if(clss[i] != '' && clss[i] != '>' && clss[i].toString().indexOf('.') === 0) {
							if(!stats.definedClasses[clss[i]]) { 
								stats.definedClasses[clss[i]] = 0;
								stats.numOfDefinedClasses += 1;
							}
							stats.definedClasses[clss[i]]++;
						}
					}
				}
			}
			for(var i=0; i<document.styleSheets.length; i++) {
				var rules = document.styleSheets[i].rules;
				if(rules && rules.length && rules.length > 0) {
					for(var j=0; j<rules.length; j++) {
						processSelector(rules[j].selectorText);
					}
				}
			}
		}
	};
	api.parse = function(done) {
		api.stats = stats = {
			nodes: 0,
			numOfUsedClasses: 0,
			usedClasses: {},
			numOfDefinedClasses: 0,
			definedClasses: {}
		};
		var gap = 1;
		(function parse(e, storage, path, cb) {

			// skipping text nodes and script tags
			if(e.nodeType !== 1 || e.nodeType == 'SCRIPT') { cb(); return; }

			// skipping Modulize extension node
			if(e.nodeType === 1 && e.getAttribute && e.getAttribute('class') != null && e.getAttribute('class').toString().indexOf('modulize-ext') >= 0) { cb(); return; }

			// collecting stats (number of nodes)
			stats.nodes += 1;

			// showing processing message
			ui.showMessage('Parsing the DOM tree.<br />' + stats.nodes + ' nodes processed.');

			// local vars
			var cls = e.getAttribute ? e.getAttribute('class') : null, 
			clss = [], c,
			elStorage = [],
			numChilds = e.childNodes.length,
			numOfProcessed = 0,
			processed,
			item = {
				name: (e.nodeName + (cls != null ? '.' + cls : '')).toLowerCase(),
				id: 'el' + stats.nodes,
				childs: elStorage
			};
			item.path = path;
			storage.push(item);

			// marking the node
			e.setAttribute('data-modulize-id', item.id);

			// collecting stats (getting classes)
			if(cls != null) {
				clss = cls.split(' ');
				for(var i=0; i<clss.length; i++) {
					if(clss[i] != '') {
						if(!stats.usedClasses[clss[i]]) { 
							stats.usedClasses[clss[i]] = 0;
							stats.numOfUsedClasses += 1;
						}
						stats.usedClasses[clss[i]]++;
					}
				}
			}

			// recursion
			if(numChilds > 0) {
				processed = function() {
					numOfProcessed++;
					if(e.childNodes[numOfProcessed]) {
						setTimeout(function(){
							parse(e.childNodes[numOfProcessed], elStorage, item.path + ' ' + item.name, processed);
						}, gap);
					} else {
						cb();
					}
				}
	            setTimeout(function(){
					parse(e.childNodes[numOfProcessed], elStorage, item.path + ' ' + item.name, processed);
				}, gap);
        	} else {
        		cb();
        	}

		})(ui.qs('body', document), api.elements = elements = [], '', function() {
			getStylesheets();
			done();
		});
		return this;
	}
	return api;
}