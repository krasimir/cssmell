var Message = absurd.component('Message', {
	shown: false,
	css: {
		'#message': {
			display: '<% shown ? "block" : "none" %>',
			pos: 'a',
			top: 0, left: 0,
			wid: '100%',
			hei: '100%',
			bg: '#FFF',
			bxz: 'bb',
			color: '#000',
			'.content': {
				wid: '100%',
				pos: 'a',
				top: '50%',
				ta: 'c',
				mar: '-50px 0 0 0'
			}
		}
	},
	html: {
		'div#message': {
			'.curtain': '',
			'i.icon-flag': '',
			'.content': ''
		}
	},
	show: function(tpl) {
		this.shown = true;
		this.html['div#message']['.content'] = tpl;
		if(!this.el) {
			this.qs('body').appendChild(this.populate().el);
		} else {
			this.populate();
		}
	},
	hide: function() {
		this.shown = false;
		this.populate();
	},
	update: function(str) {
		this.qs('.content').innerHTML = str;
	}
});
absurd.di.register('$message', Message());