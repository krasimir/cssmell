var devToolsPort, contentPort;
chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (request) {
       	switch(port.name) {
			case 'to-content':
				devToolsPort = port;
				chrome.tabs.getSelected(null, function(tab) {
			        chrome.tabs.sendMessage(tab.id, request, function(response) {});
		    	});
			break;
			case 'from-content': 
				contentPort = port;
				devToolsPort.postMessage(request);
			break;
			case 'log':
				for(var i=0; i<request.args.length; i++) {
					console.log(request.args[i]);	
				}
			break;
		}
    });
});