var Menu = absurd.component('Menu', {
	selected: -1,
	styles: [],
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
				lh: '1em',
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
				},
				small: {
					color: '#666'
				}
			},
			'a.selected': {
				bdl: '10px solid #AEE081'
			}
		}
	},
	html: {
		'.links[data-absurd-event="click:linkClicked"]': ''
	},
	constructor: function() {
		this.populate();
		this.qs('#menu', document).appendChild(this.el);
	},
	setSelected: function(index) {
		this.selected = index;
		this.dispatch('select', this.selected);
		return this;
	},
	render: function(styles) {
		this.styles = styles || this.styles;
		var html = '';
		for(var i=0; i<this.styles.length; i++) {
			var st = this.styles[i][this.styles[i].length-1];
			html += '<a href="#" data-index="' + i + '" class="' + (this.selected === i ? 'selected' : '') + '">' + st.selector;
			html += '<br /><small>' + st.specificity.join('.') + '</small></a>';
		}
		this.html['.links[data-absurd-event="click:linkClicked"]'] = html;
		this.populate();
		return this;
	},
	linkClicked: function(e) {
		e.preventDefault();
		var index = e.target.getAttribute('data-index');
		if(index === null) {
			index = e.target.parentNode.getAttribute('data-index');
		}
		this.setSelected(parseInt(index)).render();
	},
	init: function(styles) {
		this.setSelected(0).render(styles);
	}
});