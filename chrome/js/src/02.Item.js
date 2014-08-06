var Item = absurd.component('Item', {
	styles: [],
	allStyles: {},
	css: {
		'.item': {
			wid: '100%',
			mar: '0 0 2em 0'
		},
		'.item-selector': {
			bdt: '2px solid #8BD349',
			bg: '#CDECB0',
			pad: '0.2em 0.4em'
		},
		'.item-styles': {

		},
		'.prop': {
			pad: '0 0 0 0.5em'
		},
		'.prop-name': {
			color: '#F00'
		},
		'.prop-name-inherited': {
			pad: '0 0 0 1.6em'
		},
		'.prop-value-nonactive': {
			ted: 'line-through'
		},
		'.parent': {
			pad: '0 0 0 0.5em'
		}
	},
	html: {
		'.item': {
			'.item-selector': '<% getSelector() %>',
			'.item-styles': [
				'<% for(var prop in allStyles) { %>',
					{ '.prop': '<span class="prop-name"><% prop %>: </span> <span class="prop-value"><% allStyles[prop] %>;</span>' },
				'<% } %>',
				'<% for(var i=styles.length-2; i>=0; i--) { %>',
					'<% if(i < styles.length-1) { %>',
						{ '.parent': '<i class="fa fa-arrow-circle-right"></i>&nbsp;<% styles[i].selector %>' },
					'<% } %>',
					'<% for(var prop in styles[i].properties) { %>',
						'<% if(styles[i].properties[prop].status !== "active") { %>',
						{ '.prop-name-inherited.prop-value-nonactive': '<span class="prop-name"><% prop %>: </span> <span class="prop-value"><% styles[i].properties[prop].value %>;</span>' },
						'<% } else { %>',
						{ '.prop-name-inherited': '<span class="prop-name"><% prop %>: </span> <span class="prop-value"><% styles[i].properties[prop].value %>;</span>' },
						'<% } %>',
					'<% } %>',
				'<% } %>'
			]
		}
	},
	getSelector: function() {
		if(this.styles.length > 0) {
			return this.styles[this.styles.length-1].selector;
		} else {
			return '';
		}
		return this;
	},
	fetchAllStyles: function() {
		this.allStyles = {};
		for(var i=0; i<this.styles.length; i++) {
			for(var prop in this.styles[i].properties) {
				if(this.styles[i].properties[prop].status === 'active') {
					this.allStyles[prop] = this.styles[i].properties[prop].value;
				}
			}
		}
		console.log(this.allStyles);
		return this;
	},
	show: function(styles) {
		console.log(styles);
		this.styles = styles;
		this.fetchAllStyles().populate();
		this.el.style.display = 'block';
		return this;
	},
	hide: function() {
		this.el.style.display = 'none';
		return this;
	}
});