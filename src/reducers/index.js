// Set up your root reducer here...
 import { combineReducers } from 'redux';
 import {routerReducer} from 'react-router-redux';
 import game from './game';
 import allPlayers from './players';

 export default combineReducers ({
  routing: routerReducer,
  game,
  allPlayers
 });