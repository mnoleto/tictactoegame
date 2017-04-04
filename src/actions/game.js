import { createActions } from 'reduxsauce';

/*
 * build an object which contains Types and Creators.
 */
export const { Types, Creators } = createActions({
  newGame: null,
  newGameSuccess: ['board', 'players', 'result', 'turn'],
  newGameFailure: null,
  newRound: null,
  newRoundSuccess: ['board', 'players', 'result', 'turn'],
  newRoundFailure: null,
  sendPlayersName: ['playerX', 'playerO'],
  sendPlayersNameSuccess: ['board', 'players', 'result', 'turn'],
  sendPlayersNameFailure: null,
  registerMove: ['position'],
  registerMoveSuccess: ['board', 'players', 'result', 'turn'],
  registerMoveFailure: null
}, {}); // options - the 2nd parameter is optional - prepend the string to all created types.

export default Creators;