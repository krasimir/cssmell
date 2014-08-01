absurd.component('App', {
	gettingStyles: function($message, $content, $dashboard) {
		$message.show('<p><i class="fa fa-gears"></i><br />Parsing your DOM tree.<br /><small></small></p>');
		$content.on('on-port-message-received', function(res) {
			$message.update('<p><i class="fa fa-gears"></i><br />Parsing your DOM tree.<br /><small>' + res.stats.nodes + ' nodes processed.</small></p>');
			if(res.status === 'done') {
				$message.hide();
				$dashboard.init(res.stats);
			}
		});
		$content.send({type: 'parsedom'});
	},
	ready: function() {
		this.gettingStyles();
	}
})();