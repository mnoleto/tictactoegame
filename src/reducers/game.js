import { createReducer } from 'reduxsauce';
import Types from './actionTypes';

// initial state
export const INITIAL_STATE = { board: [], players: [], result: {}, turn: '' };


// REDUCERS
// - all reducers fire in response to actions

/*
 * function to request data
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const request = (state = INITIAL_STATE, actions) => {
  return state;
};

/*
 * function called when data request returns sucessfully
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const success = (state = INITIAL_STATE, actions) => {
  return Object.assign({}, state, {
    board: actions.board,
    players: actions.players.map((value) => value),
    result: actions.result,
    turn: actions.turn
  });
};

/*
 * function to request the player name
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const playersNameRequest = (state = INITIAL_STATE, actions) => {
  return Object.assign({}, state, {
    players: [actions.playerX, actions.playerO]
  });
};


// map action types to our reducer functions
const HANDLERS = {
  [Types.NEW_GAME]: request,
  [Types.NEW_GAME_SUCCESS]: success,
  [Types.NEW_ROUND]: request,
  [Types.NEW_ROUND_SUCCESS]: success,
  [Types.SEND_PLAYERS_NAME]: playersNameRequest,
  [Types.SEND_PLAYERS_NAME_SUCCESS]: success,
  [Types.REGISTER_MOVE]: request,
  [Types.REGISTER_MOVE_SUCCESS]: success,
  [Types.RESET_GAME]: request,
  [Types.RESET_GAME_SUCCESS]: success
};

export default createReducer(INITIAL_STATE, HANDLERS);