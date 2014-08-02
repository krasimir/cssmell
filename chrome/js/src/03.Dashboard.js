var Dashboard = absurd.component('Dashboard', {
	css: DashboardCSS(CSSSettings)
});
absurd.di.register('$dashboard', Dashboard());

function DashboardCSS(s) {
	return {

	}
}