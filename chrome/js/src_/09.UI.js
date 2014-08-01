var UI = function(screenCapture) {
	var added = false, listeners = {},
	$el, $filter, $tree, $treeList, $message, $panelLeft, $panelRight, $panels, $body,
	template = '<div class="modulize-ext">\
		<div class="modulize-ext-panels">\
			<section class="modulize-ext-panel--left">\
				<input type="text" class="modulize-ext--filter" data-component="modulize-ext-filter" placeholder="type a selector"/>\
				<div class="modulize-ext-tree"><ul></ul></div>\
				<div class="modulize-ext-details"></div>\
			</section>\
			<section class="modulize-ext-panel--right"></section>\
			<br class="modulize-ext-clear" />\
		</div>\
		<div class="modulize-ext-message"></div>\
	</div>',
	qs = function(sel, parent) {
		return (parent || $el || document).querySelector(sel);
	};
	
	var api = {
		init: function() {
			if(added) {
				$el.style.display = 'block';
				return;
			}
			$el = str2DOMElement(template);
			$body = qs('body', document);
			$body.appendChild($el);
			$filter = qs('.modulize-ext--filter');
			$tree = qs('.modulize-ext-tree');
			$message = qs('.modulize-ext-message');
			$treeList = qs('ul', $tree);
			$panels = qs('.modulize-ext-panels');
			$panelLeft = qs('.modulize-ext-panel--left');
			$panelRight = qs('.modulize-ext-panel--right');
			$details = qs('.modulize-ext-details');
			this.addEvents();
			added = true;
			return this;
		},
		destroy: function() {
			if(added) {
				$el.style.display = 'none';
				$panels.style.display = 'none';
				$filter.value = '';
				this.hideMessage().hideDetails();
			}
		},
		qs: qs,
		on: function(event, callback) {
			if(!listeners[event]) listeners[event] = [];
			listeners[event].push(callback);
		},
		dispatch: function(event, data) {
			if(listeners[event]) {
				for(var i=0; i<listeners[event].length; i++) {
					listeners[event][i](data);
				}
			}
		},
		show: function() {
			$el.style.display = 'block';
			return this;
		},
		hide: function() {
			$el.style.display = 'none';
			return this;
		},
		showMessage: function(str) {
			$panels.style.display = 'none';
			$message.style.display = 'block';
			$message.innerHTML = str;
			return this;
		},
		hideMessage: function() {
			$panels.style.display = 'block';
			$message.style.display = 'none';
			$message.innerHTML = '';
			return this;
		},
		printStats: function(stats) {
			console.log(stats);
			var html = '';
			
			// common
			html += '<div class="modulize-ext-panel--right--aside">';
			html += 'DOM nodes: <strong>' + stats.nodes + '</strong><br />';
			html += '</div>'

			// unused classes
			var notUsed = [], allClasses = 0;
			for(var clsD in stats.definedClasses) {
				allClasses++;
				var used = false;
				for(var clsU in stats.usedClasses) {
					if('.' + clsU === clsD) {
						used = true;	
					}
				}
				if(!used) notUsed.push(clsD);
			}
			if(allClasses > 0) {
				html += '<div class="modulize-ext-panel--right--aside">';
				html += '<strong>Applied but not used CSS (' + notUsed.length + ', ' + Math.floor(notUsed.length / allClasses * 100) + '%):</strong><br />';
				for(var i=0; i<notUsed.length; i++) {
					html += notUsed[i] + '<br />';
				}
				html += '</div>';
			}

			// top classes
			var clss = [], tmp, to;
			for(var cls in stats.usedClasses) { clss.push({ cls: cls, num: stats.usedClasses[cls] }); }
			for(var i=0; i<clss.length; i++) {
				for(var j=i+1; j<clss.length; j++) {
					if(clss[i].num < clss[j].num) {
						tmp = clss[i];
						clss[i] = clss[j];
						clss[j] = tmp;
					}
				}
			}
			html += '<div class="modulize-ext-panel--right--aside">';
			html += '<strong>Top classes:</strong><br />';
			for(var i=0; i<clss.length; i++) {
				html += '.' + clss[i].cls + ' (' + clss[i].num + ')<br />';
			}
			html += '</div>'

			$panelRight.innerHTML = html;

			return this;
		},
		addElements: function(els) {
			var html = '';
			(function buildTree(elements) {
				for(var i=0; i<elements.length; i++) {
					var e = elements[i];
					html += '<li class="modulize-ext-tree-row">';
					html += '<a href="#" \
						data-modulize-action="yes" \
						data-modulize-id="' + e.id + '" \
						data-modulize-path="' + e.path + '" \
						data-modulize-name="' + e.name + '">';
					html += e.path != '' ? '<span>' + e.path + '</span>' : '';
					html += ' <strong>' + e.name + '</strong>';
					if(e.childs.length > 0) {
						buildTree(e.childs);
					}
					html += '</a></li>';
				}
			})(els, '');
			$treeList.innerHTML = html;
			return this;
		},
		addEvents: function() {
			if(added) { return this; }
			var self = this;
			$el.addEventListener('click', function(e) {
				e && e.preventDefault();
				if(e && e.target && e.target.getAttribute && e.target.getAttribute('data-modulize-event') !== null) {
					self.dispatch(e.target.getAttribute('data-modulize-event'))
				}
			});
			$filter.addEventListener('keyup', function(e) {
				var item, i, val = $filter.value, r = new RegExp(val, 'i');
				if(val !== '' && val.length > 1) {
					$treeList.style.display = 'block';
					for(i=0; i<$treeList.childNodes.length; i++) {
						item = $treeList.childNodes[i];
						if(r.test(item.innerText)) {
							item.style.display = 'block';
						} else {
							item.style.display = 'none';
						}
					}
				} else {
					$treeList.style.display = 'none';
				}
			});
			$treeList.addEventListener('click', function(e) {
				var link, selector;
				if(e.target.nodeName.toLowerCase() === 'a') { link = e.target; }
				else if(e.target.nodeName.toLowerCase() === 'span') { link = e.target.parentNode; }
				else if(e.target.nodeName.toLowerCase() === 'strong') { link = e.target.parentNode; }
				if(link && link.getAttribute && link.getAttribute('data-modulize-action') === 'yes') {
					self.showDetails(link).focusFilter();
				}
			});
			$details.addEventListener('click', function(e) {
				e && e.preventDefault();
				if(e.target && e.target.getAttribute && e.target.getAttribute('class') == 'modulize-ext-details--close') {
					self.hideDetails();
				}
			});
			return this;
		},
		focusFilter: function() {
			$filter.focus();
			return this;
		},
		showDetails: function(link) {
			var elID = link.getAttribute('data-modulize-id'),
			path = link.getAttribute('data-modulize-path'),
			name = link.getAttribute('data-modulize-name'),
			self = this;
			$tree.style.display = 'none';
			$filter.disabled = true;
			$details.style.display = 'block';
			var el = qs('[data-modulize-id="' + elID + '"]', document);
			if(el) {
				$details.appendChild(str2DOMElement('<a href="#" class="modulize-ext-details--close">(x) close</a>'));
				$details.appendChild(str2DOMElement('<h2>' + name + '<small>' + (path + ' ' + name).trim().replace(/  /g, ' ').replace(/ /g, '<span></span>') + '</small></h2>'));				
			} else {
				this.hideDetails();
			}
			return this;
		},
		hideDetails: function() {
			$tree.style.display = 'block';
			$filter.disabled = false;
			$details.style.display = 'none';
			$details.innerHTML = '';
			return this;
		}
	};

	return api;
}