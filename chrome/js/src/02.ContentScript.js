var ContentScript = absurd.component('ContentScript', {
	constructor: function() {
		var self = this;
	},
	send: function(data) {
		var self = this;
		if(inDevTools) {
			if(!this.port) {
				this.port = chrome.extension.connect({ name: 'to-content' });
	        	this.port.onMessage.addListener(function(request) {
	        		self.dispatch('on-port-message-received', request);
				});
			}
			this.port.postMessage(data);			
		} else {
			switch(data.type) {
				case 'getstyles':
					self.dispatch('on-port-message-received', {
						type: "getstyles",
						stats: Mockup.rules
					});
				break;
			}
		}
	}
});
absurd.di.register('$content', ContentScript());