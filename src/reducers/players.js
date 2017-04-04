import { createReducer } from 'reduxsauce';
import Types from './actionTypes';

// initial state
export const INITIAL_STATE = { error: false, data: [] };


// REDUCERS
// - all reducers fire in response to actions

/*
 * function to fetch all players
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const fetchPlayersRequest = (state = INITIAL_STATE, actions) => {
  return Object.assign({}, state, {
    error: false
  });
};

/*
 * function called when the fetch players request return succesfully
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const fetchPlayersSuccess = (state = INITIAL_STATE, actions) => {
  return Object.assign({}, state, {
    error: false,
    data: actions.data
  });
};

/*
 * function called when fetch players request fail
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const fetchPlayersFailure = (state = INITIAL_STATE) => {
  return Object.assign({}, state, {
    error: true
  });
};


// map action types to our reducer functions
const HANDLERS = {
  [Types.FETCH_PLAYERS]: fetchPlayersRequest,
  [Types.FETCH_PLAYERS_SUCCESS]: fetchPlayersSuccess,
  [Types.FETCH_PLAYERS_FAILURE]: fetchPlayersFailure
};

export default createReducer(INITIAL_STATE, HANDLERS);