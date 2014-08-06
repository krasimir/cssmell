var Dashboard = absurd.component('Dashboard', {
	css: DashboardCSS(CSSSettings),
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
		for(var i=0; i<5; i++) {
			if(styles[i] && styles[i].length > 0) {
				this.items[i].show(styles[i]);
			} else {
				this.items[i].hide();
			}
		}
	}
});
absurd.di.register('$dashboard', Dashboard());

function DashboardCSS(s) {
	return {

	}
}