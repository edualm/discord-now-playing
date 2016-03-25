var iTunes = require('playback');
var Discordie = require('discordie');
var Events = Discordie.Events;

var client = new Discordie();

var lastSong = '';

client.connect({
	token: "YOUR-DISCORD-TOKEN-HERE"
});

client.Dispatcher.on(Events.GATEWAY_READY, e => {
	console.log("Connected as: " + client.User.username);

	changeStatusLoop();
});

function changeStatusLoop() {
	var changedStatus = false;

	iTunes.currentTrack(function(answer) {
		try {
			if (answer.name != lastSong) {
				changedStatus = true;
				lastSong = answer.name;

				client.User.setStatus(null, {name: '🎶 ' + lastSong});
			}
		} catch (e) {
			if (lastSong != '') {
				changedStatus = true;

				client.User.setStatus(null, null);
			}

			lastSong = '';
		}
	});

	setTimeout(function() {
		changeStatusLoop();
	}, changedStatus ? 12500 : 1000);
}
