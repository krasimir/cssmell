var Menu = absurd.component('Menu', {
	css: {
		'#menu': {
			pos: 'f',
			top: 0,
			right: 0,
			wid: '30%',
			bxz: 'bb',
			pad: '0 0 0 0.1em',
			a: {
				d: 'b',
				ted: 'n',
				bg: '#CDECB0',
				pad: '0.5em',
				bdt: '2px solid #8BD349',
				color: '#000',
				'white-space': 'nowrap',
				'overflow': 'hidden',
				'text-overflow': 'ellipsis',
				'&:hover': {
					bg: '#9EDB68'
				}
			}
		}
	},
	html: {
		'.links': ''
	},
	constructor: function() {
		this.populate();
		this.qs('#menu', document).appendChild(this.el);
	},
	init: function(styles) {
		var html = '';
		for(var i=0; i<styles.length; i++) {
			html += '<a href="#">' + styles[i][styles[i].length-1].selector + '</a>';
		}
		this.html['.links'] = html;
		this.populate();
	}
});