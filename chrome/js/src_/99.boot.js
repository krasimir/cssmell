var app = App();
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
	if(message === 'activate-modulize') {
		app.init();
	}
});

// in development mode 
window.onload = function() {
	if(window.location && window.location.search.indexOf('modulize=1') >= 0) {
		setTimeout(function() {
			app.init();
		}, 500);
	}
}