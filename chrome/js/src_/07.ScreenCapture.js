var ScreenCapture = function() {
	var api = {}, done, capturedElementDone, dataURL, canvas, doc = {}, viewport = {}, 
	xPos = 0, yPos = 0, xMax = 1, yMax = 1;
	getDimensions = function() {
		doc = {
			width: Math.max(document.documentElement["clientWidth"], document.body["scrollWidth"], document.documentElement["scrollWidth"], document.body["offsetWidth"], document.documentElement["offsetWidth"]),
			height: Math.max(document.documentElement["clientHeight"], document.body["scrollHeight"], document.documentElement["scrollHeight"], document.body["offsetHeight"], document.documentElement["offsetHeight"])
		};
		viewport = {
			width: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
			height: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
		}
	},
	triggerCapturing = function(first) {
		console.log(xPos, yPos);
		drawArea = { 
			x: xPos * viewport.width,
			y: yPos * viewport.height,
			w: viewport.width,
			h: viewport.height
		};
		chrome.extension.sendMessage({ 
			type: 'capture',
			doc: doc,
			drawArea: drawArea,
			first: first
		}, function(response) {});
	};
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
		if(request.type == 'capture-done') {
			if(xPos < xMax-1) {
				xPos += 1;
			} else {
				xPos = 0;
				if(yPos < yMax-1) {
					yPos += 1;
				} else {
					window.scroll(0, 0);
					var i = new Image();
					i.style.position = 'absolute';
					i.style.top = '0px';
					i.style.left = '0px';
					i.style.border = 'solid 2px #f00';
					i.style.background = '#B9DAA9';
					i.style.display = 'block';
					i.style.transformOrigin = 'top left';
					i.style.transform = 'scale(0.2, 0.2)';
					i.src = request.data;
					document.querySelector('body').appendChild(i);
					return;
				}
			}
			window.scroll(xPos * viewport.width, yPos * viewport.height);
			setTimeout(triggerCapturing, 200);
		}
	});
	api.capture = function(cb) {

		done = cb;
		getDimensions();

		xMax = Math.ceil(doc.width / viewport.width);
		yMax = Math.ceil(doc.height / viewport.height);
		xPos = yPos = 0;
		setTimeout(function() {
			triggerCapturing(true);
		}, 200);		
	}
	api.captureElement = function(el, cb) {
		if(dataURL) {
			var dimensions = el.getBoundingClientRect();
	    	if (!canvas) {
	            canvas = document.createElement("canvas");
	            document.body.appendChild(canvas);
	        }
	        var image = new Image();
	        image.onload = function() {
	            canvas.width = dimensions.width;
	            canvas.height = dimensions.height;
	            var context = canvas.getContext("2d");
	            context.drawImage(image,
	                dimensions.left, dimensions.top,
	                dimensions.width, dimensions.height,
	                0, 0,
	                dimensions.width, dimensions.height
	            );
	            var croppedDataUrl = canvas.toDataURL("image/png");
	        	cb({ dataURL: croppedDataUrl });
	        }
	        image.src = dataURL;
		} else {
			cb({ dataURL: null });
		}
	}
	return api;
}