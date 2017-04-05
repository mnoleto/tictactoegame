import { createActions } from 'reduxsauce';

/*
 * build an object which contains Types and Creators.
 */
export const { Types, Creators } = createActions({
  newGame: null,
  newGameSuccess: ['board', 'players', 'result', 'turn'],
  newRound: null,
  newRoundSuccess: ['board', 'players', 'result', 'turn'],
  sendPlayersName: ['playerX', 'playerO'],
  sendPlayersNameSuccess: ['board', 'players', 'result', 'turn'],
  registerMove: ['position'],
  registerMoveSuccess: ['board', 'players', 'result', 'turn'],
  resetGame: null,
  resetGameSuccess: ['board', 'players', 'result', 'turn']
}, {}); // options - the 2nd parameter is optional - prepend the string to all created types.

export default Creators;