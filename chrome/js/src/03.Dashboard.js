var Dashboard = absurd.component('Dashboard', {
	css: DashboardCSS(CSSSettings),
	html: '#dashboard',
	addItems: function() {
		this.populate();
		for(var i=0; i<)
		return this;
	},
	init: function(styles) {		
		console.log(styles);
		this.el.innerHTML = '';
	}
});
absurd.di.register('$dashboard', Dashboard());

function DashboardCSS(s) {
	return {

	}
}