import { createTypes } from 'reduxsauce';

// create the object representing action types
export default createTypes(`
  FETCH_PLAYERS
  FETCH_PLAYERS_SUCCESS
  NEW_GAME
  NEW_GAME_SUCCESS
  NEW_ROUND
  NEW_ROUND_SUCCESS
  SEND_PLAYERS_NAME
  SEND_PLAYERS_NAME_SUCCESS
  REGISTER_MOVE
  REGISTER_MOVE_SUCCESS
  RESET_GAME
  RESET_GAME_SUCCESS
`, {}); // options - the 2nd parameter is optional