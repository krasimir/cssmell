var App = function() {

	var active = false, 
	screenCapture = ScreenCapture(), 
	ui = UI(screenCapture), 
	parser = Parser(ui);

	var api = {
		init: function() {
			active = !active;
			ui.init();
			if(active) {
				parser.parse(function() {
					ui
					.hideMessage()
					.printStats(parser.stats)
					.addElements(parser.elements)
					.addEvents()
					.focusFilter();
				});
			} else {
				ui.destroy();
			}
		}
	}
	return api;
}