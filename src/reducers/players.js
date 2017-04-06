import { createReducer } from 'reduxsauce';
import Types from './actionTypes';

// initial state
export const INITIAL_STATE = { data: [] };


// REDUCERS
// - all reducers fire in response to actions

/*
 * function to fetch all players
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const fetchPlayersRequest = (state = INITIAL_STATE) => {
  return Object.assign({}, state, {});
};

/*
 * function called when the fetch players request return succesfully
 * @param state [Object]: 
 * @param actions [Object]
 * @return newState: [Object]
 */
export const fetchPlayersSuccess = (state = INITIAL_STATE, actions) => {
  if(actions.data !== state.data) {
    return Object.assign({}, state, {
      data: actions.data
    });
  }
  return state;
};


// map action types to our reducer functions
const HANDLERS = {
  [Types.FETCH_PLAYERS]: fetchPlayersRequest,
  [Types.FETCH_PLAYERS_SUCCESS]: fetchPlayersSuccess
};

export default createReducer(INITIAL_STATE, HANDLERS);