var debug = function(o) {
	var d = document.querySelector('#debug');
	if(typeof o === 'object') {
		d.innerHTML = JSON.stringify(o) + '<br />' + d.innerHTML;
	} else {
		d.innerHTML = o + '<br />' + d.innerHTML;
	}
}