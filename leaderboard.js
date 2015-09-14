PlayersList = new Mongo.Collection('players');


if (Meteor.isClient) {
	Template.players.helpers({
		'player': function() {
			return PlayersList.find({}, { sort: {score: -1} });
		},


		'selectedClass': function() {
			// This functions returns the value selected - "selected" is what then is
			// given to the HTML element, which then makes the CSS work. It's like Selector
			// routing, lol.

			var playerID = this._id;
			var selectedPlayer = Session.get('selectedPlayer');
			if (playerID == selectedPlayer ) {
				console.log(playerID);
				return "selected-player teal lighten-3";
			}
		}
	});
}

if (Meteor.isClient) {
	Template.players.events({
		'click .player': function() {
			var playerId = this._id;
			Session.set('selectedPlayer', playerId);
			var selectedPlayer = Session.get('selectedPlayer');
		},


		'click .increment': function() {
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.update(selectedPlayer, { $inc: {score: 5} });
		},

		'click .decrement': function() {
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.update(selectedPlayer, { $inc: {score: -5} });
		}
	})
}
