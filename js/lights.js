var Lights = new (function() {
	var BRIDGE_IP = '10.42.2.1';
	var USERNAME = 'aValidUser';

	this.send = function(type, resource, body) {
		return $.ajax({
			url: 'http://' + BRIDGE_IP + '/api/' + USERNAME + resource,
			type: type,
			data: JSON.stringify(body),
			success: function(data, textStatus, jqXHR) {
				//$('#output').text(JSON.stringify(data, null, 4));
			},
			error: function(jqXHR, textStatus, errorThrown) {
				//$('#output').text(textStatus + errorThrown);
			}
		});
	};
})();
