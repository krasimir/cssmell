if(inDevTools) {
	console = {
		port: chrome.extension ? chrome.extension.connect({ name: 'log' }) : { postMessage: function() {}},
		log: function() {
			var args = Array.prototype.slice.call(arguments, 0);
	    	this.port.postMessage({args: args});
		}
	}
}

var CSSSettings = {
	bottomShadow: { bxsh: '0 2px 0px #999' },
	link: {
		color: '#000',
		trs: 'all 200ms',
		ted: 'n',
		'&:hover': { color: '#06910E' }
	},
	code: {
		ff: "'Roboto', sans-serif",
		fz: '12px',
		d: 'ib',
		pad: '0 4px',
		bd: 'solid 1px #C9C9C9',
		bdrsa: '2px',
		color: '#F85F0C'
	}
}