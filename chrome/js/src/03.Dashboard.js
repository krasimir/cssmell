var Dashboard = absurd.component('Dashboard', {
	css: {
		'#dashboard': {
			wid: '70%',
			bdr: '1px solid #8BD349'
		}	
	},
	html: '#dashboard',
	items: [],
	addItems: function(cb) {
		var self = this;
		this.populate();
		for(var i=0; i<5; i++) {
			var item = Item().populate().hide();
			self.items.push(item);
			(function(m) {
				setTimeout(function() {
					self.el.appendChild(m.el);
				}, 0);
			})(item);
		}
		return this;
	},
	init: function(styles) {
		console.log(styles);
		// this.qs('#debug', document).innerHTML = JSON.stringify(styles);
		for(var i=0; i<5; i++) {
			if(styles[i] && styles[i].length > 0) {
				this.items[i].setStyles(styles[i]);
			}
		}
	},
	showByIndex: function(index) {
		if(!this.items) return;
		for(var i=0; i<this.items.length; i++) {
			this.items[i].hide();
		}
		if(this.items[index]) {
			this.items[index].show();
		}
	}
});