import { createTypes } from 'reduxsauce'

// create the object representing action types
export default createTypes(`
  FETCH_PLAYERS
  FETCH_PLAYERS_SUCCESS
  FETCH_PLAYERS_FAILURE
  NEW_GAME
  NEW_GAME_SUCCESS
  NEW_GAME_FAILURE
  NEW_ROUND
  NEW_ROUND_SUCCESS
  NEW_ROUND_FAILURE
  SEND_PLAYERS_NAME
  SEND_PLAYERS_NAME_SUCCESS
  SEND_PLAYERS_NAME_FAILURE
  REGISTER_MOVE
  REGISTER_MOVE_SUCCESS
  REGISTER_MOVE_FAILURE
`, {}) // options - the 2nd parameter is optional