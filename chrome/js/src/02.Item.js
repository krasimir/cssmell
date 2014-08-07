var Item = absurd.component('Item', {
	rawStyles: [],
	styles: {},
	css: {
		'.item': {
			wid: '100%',
			d: 'n'
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
		'.inherited': {
			d: 'n',
			bg: '#DCF2C8',
			mar: '0.2em 0.7em 0 0.7em',
			pad: '0.4em'
		},
		'.prop-name': {
			color: '#F00'
		},
		'.prop-name-inherited': {
			pad: '0 0 0 0.4em',
			'.prop-name': {
				color: '#A40004'
			}
		},
		'.prop-value-nonactive': {
			ted: 'line-through'
		},
		'.toggle-inheritance': {
			d: 'n',
			'&:checked + .inherited': {
				d: 'b'
			}
		},
		label: {
			fz: '0.9em',
			cursor: 'pointer'
		}
	},
	html: {
		'.item': {
			'.item-selector': '<% getSelector() %>',
			'.item-styles': [
				'<% for(var prop in styles) { var propid = getPropID(); %>',
					{ '.prop': [
						'<span class="prop-name"><% prop %>: </span> <span class="prop-value"><% styles[prop].value %>;</span>',
						'<% if(styles[prop].inheritance.length > 1) { %>',
							{ 'label[for="<% propid %>"]': '&nbsp;&nbsp;<i class="fa fa-database"></i>'},
						'<% } %>'
					]}, 
					{ 'input.toggle-inheritance#<% propid %>[type="checkbox"]': '' },
					'<% if(styles[prop].inheritance.length > 1) { %>',
						{ '.inherited': 
							[
							'<% for(var i=styles[prop].inheritance.length-1; i >= 0; i--) { var parent = styles[prop].inheritance[i]; %>',
								{ '.parent': '<% parent.selector %>' },
								'<% if(parent.status !== "active") { %>',
									{ '.prop-name-inherited.prop-value-nonactive': '<span class="prop-name">&#8627; <% prop %>: </span> <span class="prop-value"><% parent.value %>;</span>' },
									'<% } else { %>',
									{ '.prop-name-inherited': '<span class="prop-name">&#8627; <% prop %>: </span> <span class="prop-value"><% parent.value %>;</span>' },
									'<% } %>',
							'<% } %>',
							] 
						},
					'<% } %>',
				'<% } %>'
			]
		}
	},
	getSelector: function() {
		if(this.rawStyles.length > 0) {
			return this.rawStyles[this.rawStyles.length-1].selector;
		} else {
			return '';
		}
		return this;
	},
	getPropID: function() {
		return 'prop' + Math.floor((Math.random() * 100000000) + 1);
	},
	formatStyles: function(raw) {
		var i, s, styles = {};
		for(i=0; i<raw.length; i++) {
			for(var prop in raw[i].properties) {
				if(!styles[prop]) styles[prop] = { value: '', inheritance: [] };
				s = styles[prop];
				if(raw[i].properties[prop].status === 'active') {
					s.value = raw[i].properties[prop].value;
				}
				s.inheritance.push({ 
					selector: raw[i].selector, 
					value: raw[i].properties[prop].value,
					status: raw[i].properties[prop].status
				});
			}
		}
		this.styles = styles;
		return this;
	},
	setStyles: function(styles) {
		this.rawStyles = styles;
		this.formatStyles(styles).populate();
		return this;
	},
	show: function() {
		this.el.style.display = 'block';
		return this;
	},
	hide: function() {
		this.el.style.display = 'none';
		return this;
	}
});