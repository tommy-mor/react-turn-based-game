/** This is where the user describes the game! */
/* eslint-disable */

/* stdlib: helper functions for working with the game! */
// Make a copy of an object or array so you don't mutate it!
const deepcopy = (obj) => JSON.parse(JSON.stringify(obj));

// the definition of the game.
const game = {
	/* Specifies the initial state for the game and each player. */
	initialState: {
		game: () => 0,
		player: () => ({
			lefthand: 5,
			righthand: 5
		}),
	},

	/* Specifies the different actions that players can take during the game. */
	actions: {
		// With an action, the user can:
		"shift": (gameState, players, playerId, payload) => ({
			// the player state,
			playerState: players.map(({ id, ...player }) => ({
				...player,
				id,
				// TODO: check if the hand is zero or not
				state: { lefthand: player.state.lefthand + payload.data[1], righthand: player.state.righthand - payload.data[1]} ,
			})),
			// and determine whether to pass the turn after the action is taken.
			passTurn: false,
			// They aren't required to provide any of these parameters,
			// as if they are not defined they just won't be used.
		}),
		"touch": (gameState, players, playerId, payload) =>
		{
			console.log('test');
			return { gameState: gameState + 1,
					 playerState: players.map(({ id, ...player }) => ({
						 ...player,
						 id,
						 state: player.state,
					 })),
					 passTurn: true,
					 // Please don't mutate things, either... that wouldn't be very nice.
				   };

		},
	},

	/* Determines when the game ends. */
	endWhen: (gameState, playerStates) =>
	playerstates.any(({lefthand, righthand, ...player}) => lefthand == 0 || righthand == 0),
	/* Determines the winner(s) at the end of the game. */
	getWinners: (gameState, players) =>
	players.filter(({ state }) => state.clickedLast),
};

module.exports = game;
