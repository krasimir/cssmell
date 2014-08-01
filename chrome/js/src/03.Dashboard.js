var Dashboard = absurd.component('Dashboard', {
	html: {}, data: null, treeHTML: '',
	css: DashboardCSS(CSSSettings),
	init: function(stats, $content) {
		// console.log(JSON.stringify(stats));
		this.html = this.tplHome;
		this.analyze(stats).qs('#dashboard').appendChild(this.showTree().el);
	},
	// analyze
	analyze: function(stats) {
		console.log(stats);
		this.data = {
			nodes: stats.nodes,
			numOfClasses: stats.numOfUsedClasses,
			mostUsedClass: this.getMostUsedClass(stats),
		};

		// ***************************************** looping through the styles
		var prop, self = this; this.treeHTML = '';
		(function process(els) {
			self.treeHTML += '<ul>';
			for(var i=0; i<els.length; i++) {

				// parsing the elements
				var el = els[i];
				if(el.name !== 'script') {
					self.treeHTML += '<li>';
					self.treeHTML += '<a href="#">' + el.name + '</a>';
					// if(el.css && el.css.length > 0) {
					// 	for(var j=el.css.length-1; j>=0; j--) {
					// 		for(var propName in el.css[j].properties) {
					// 			prop = el.css[j].properties[propName];
					// 			if(prop.status === 'active') {
					// 				console.log(prop.value);
					// 			}
					// 		}
					// 	}
					// }

					// processing the childs
					if(el.childs.length > 0) {
						process(el.childs);
					}
					self.treeHTML += '</li>';
				}
			}
			self.treeHTML += '</ul>';
		})(stats.storage);

		// ***************************************** collecting colors
    	this.data.colors = [];

		return this;
	},
	getMostUsedClass: function(stats) {
		var max = 0, cls = '';
		for(var i in stats.usedClasses) {
			if(stats.usedClasses[i] > max) {
				max = stats.usedClasses[i];
				cls = i;
			}
		}
		return { cls: cls, count: max };
	},
	// UI
	showTree: function(e) {
		e && e.preventDefault();
		this.html = {
			'.dashboard': [
				this.tplInfoLine,
				{ '.tree': this.treeHTML }
			]
		};
		this.populate();
		return this;
	},
	// partials
	tplInfoLine: {
		'.info-line': {
			'span.nodes': '<i class="fa fa-code"></i> DOM Nodes: <% data.nodes %>',
			'span.separator.b': '&nbsp;',
			'span.classes': '<i class="fa fa-dot-circle-o"></i> Classes: <% data.numOfClasses %>',
			'span.separator.c': '&nbsp;',
			'span.most-used-class': '<i class="fa fa-circle-o"></i> Most used class: <code>.<% data.mostUsedClass.cls + " (" + data.mostUsedClass.count + ")" %></code>',
		}
	}
});
absurd.di.register('$dashboard', Dashboard());

function DashboardCSS(s) {
	return {

		'.info-line': [{
			bg: '#525252',
			color: '#FFF',
			fz: '14px',
			pad: '4px 6px',
			'.separator': {
				d: 'ib',
				wid: '2px',
				bg: '#727272',
				mar: '0 10px'
			},
			a: [s.link, { color: '#FFF' }],
			'code': [ s.code, { color: '#C5C5C5', bd: 'solid 1px #727272' }]
		}, s.bottomShadow ],

		'.row': [{
			bxz: 'bb',
			pad: '10px 20px',
			h2: {
				fz: '28px',
				fw: 'bold',
				mar: '0 0 10px 0',
				pad: 0
			},
		}, s.bottomShadow ],
	}
}