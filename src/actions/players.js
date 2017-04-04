import { createActions } from 'reduxsauce';

/*
 * build an object which contains Types and Creators.
 */
export const { Types, Creators } = createActions({
  fetchPlayers: null,
  fetchPlayersSuccess: ['data'],
  fetchPlayersFailure: null
}, {}); // options - the 2nd parameter is optional - prepend the string to all created types.

export default Creators;