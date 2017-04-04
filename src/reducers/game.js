import { createReducer } from 'reduxsauce';
import Types from './actionTypes';

// initial state
export const INITIAL_STATE = { error: false, board: [], players: [], result: {}, turn: '' };


// REDUCERS
// - all reducers fire in response to actions

/*
 * function to request the player name
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const newGameRequest = (state = INITIAL_STATE, actions) => {
  return Object.assign({}, state, {
    error: false
  });
};

/*
 * function called when the player name request return succesfully
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const newGameSuccess = (state = INITIAL_STATE, actions) => {
  return Object.assign({}, state, {
    error: false,
    board: actions.board,
    players: actions.players,
    result: actions.result,
    turn: actions.turn
  });
};

/*
 * function called when the player name request fail
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const newGameFailure = (state = INITIAL_STATE) => {
  return Object.assign({}, state, {
    error: true
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
    error: false,
    players: [actions.playerX, actions.playerO]
  });
};

/*
 * function called when the player name request return succesfully
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const playersNameSuccess = (state = INITIAL_STATE, actions) => {
  return Object.assign({}, state, {
    error: false,
    board: actions.board,
    players: actions.players,
    result: actions.result,
    turn: actions.turn
  });
};

/*
 * function called when the player name request fail
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const playersNameFailure = (state = INITIAL_STATE) => {
  return Object.assign({}, state, {
    error: true
  });
};

/*
 * function called to register a player move
 * @param state [Object]: 
 * @param actions [Object]:
 * @return newState: [Object]: 
 */
export const registerMoveRequest = (state = INITIAL_STATE, actions) => {
  return Object.assign({}, state, {
    error: false
  });
};

/*
 * function called when the register move return succesfully
 * @param state [Object]: 
 * @param actions [Object]:
 * @return newState: [Object]: 
 */
export const registerMoveSuccess = (state = INITIAL_STATE, actions) => {
  return Object.assign({}, state, {
    error: false,
    board: actions.board,
    players: actions.players,
    result: actions.result,
    turn: actions.turn
  });
};

/*
 * function called when the register move fail
 * @param state [Object]: 
 * @param actions [Object]:
 * @return newState: [Object]: 
 */
export const registerMoveFailure = (state = INITIAL_STATE) => {
  return Object.assign({}, state, {
    error: true
  });
};


// map action types to our reducer functions
const HANDLERS = {
  [Types.NEW_GAME]: newGameRequest,
  [Types.NEW_GAME_SUCCESS]: newGameSuccess,
  [Types.NEW_GAME_FAILURE]: newGameFailure,
  [Types.SEND_PLAYERS_NAME]: playersNameRequest,
  [Types.SEND_PLAYERS_NAME_SUCCESS]: playersNameSuccess,
  [Types.SEND_PLAYERS_NAME_FAILURE]: playersNameFailure,
  [Types.REGISTER_MOVE]: registerMoveRequest,
  [Types.REGISTER_MOVE_SUCCESS]: registerMoveSuccess,
  [Types.REGISTER_MOVE_FAILURE]: registerMoveFailure,
};

export default createReducer(INITIAL_STATE, HANDLERS);