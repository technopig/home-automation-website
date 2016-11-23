
var DELAY_TIME = 1000;

function on_poll_event(event, cb) {
	var xhr = event.target;
	if (xhr.readyState === XMLHttpRequest.DONE) {
		var response = JSON.parse(xhr.responseText);
		cb(response.value);
	}
}

function startPoll(target, cb) {
	var poller = setInterval(function () {
		poll(target, cb)
	}, DELAY_TIME);
	
}


function poll(target, cb) {
	var xhr = new XMLHttpRequest();
	// xhr.onreadystatechange automatically calls 'function' with the
	//  result of it's latest event. 
	xhr.onreadystatechange = function (event) {
		on_poll_event(event, cb);
	}
	xhr.open('GET', '/cgi-bin/particle_poller.py?target='+target, true);
	xhr.send();
	
}




