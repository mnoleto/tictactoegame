import sagaHelper from 'redux-saga-testing';
import { apply, put } from 'redux-saga/effects';
import playersActions from '../actions/players';
import gameActions from '../actions/game';
import GameApi from '../services/Game';

import { fetchPlayers, newGame, newRound, registerMove, sendPlayersName } from '../sagas';

const Api = new GameApi();

describe('fetchPlayers', () => {
  const it = sagaHelper(fetchPlayers());

  it('should have called the mock API and return an array of players', result => {
    expect(result).toEqual(apply(Api, Api.fetchPlayers));

    // The API is not called so we have to give its expected response.
    // specify what the API should have returned. 
    return ['Player 1', 'Player 2'];
  });

  // test that on the next step some action is called
  it('and then call the success action with the data returned by the API', result => {
    expect(result).toEqual(put(playersActions.fetchPlayersSuccess(['Player 1', 'Player 2'])));
  });

  it('and then do nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('newGame', () => {
  const it = sagaHelper(newGame());

  it('should have called the mock API', result => {
    expect(result).toEqual(apply(Api, Api.newGame));

    // The API is not called so we have to give its expected response.
    // specify what the API should have returned. 
    return {
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: [],
      result: {status: 'waiting'},
      turn: ''
    };
  });

  // test that on the next step some action is called
  it('and then call the success action with the data returned by the API', result => {
    expect(result).toEqual(put(gameActions.newGameSuccess(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], [], {status: 'waiting'}, '')));
  });

  it('and then do nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('newRound', () => {
  const it = sagaHelper(newRound());

  it('should have called the mock API', result => {
    expect(result).toEqual(apply(Api, Api.newRound));

    // The API is not called so we have to give its expected response.
    // specify what the API should have returned. 
    return {
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: ['Player 2', 'Player 1'],
      result: {status: 'waiting'},
      turn: ''
    };
  });

  // test that on the next step some action is called
  it('and then call the success action with the data returned by the API', result => {
    expect(result).toEqual(put(gameActions.newRoundSuccess(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], ['Player 2', 'Player 1'], {status: 'waiting'}, '')));
  });

  it('and then do nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('registerMove', () => {
  const action = {position: 0};
  const it = sagaHelper(registerMove(action));

  it('should have called the mock API', result => {
    expect(result).toEqual(apply(Api, Api.registerMove, [0]));

    // The API is not called so we have to give its expected response.
    // specify what the API should have returned. 
    return {
      board: ['X', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: ['Player 1', 'Player 2'],
      result: {status: 'running'},
      turn: ''
    };
  });

  // test that on the next step some action is called
  it('and then call the success action with the data returned by the API', result => {
    expect(result).toEqual(put(gameActions.registerMoveSuccess(['X', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], ['Player 1', 'Player 2'], {status: 'running'}, '')));
  });

  it('and then do nothing', result => {
    expect(result).toBeUndefined();
  });
});

describe('sendPlayersName', () => {
  const action = {playerX: 'Player 1', playerO: 'Player 2'};
  const it = sagaHelper(sendPlayersName(action));

  it('should have called the mock API', result => {
    expect(result).toEqual(apply(Api, Api.startGame, ['Player 1', 'Player 2']));

    // The API is not called so we have to give its expected response.
    // specify what the API should have returned. 
    return {
      board: ['X', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: ['Player 1', 'Player 2'],
      result: {status: 'running'},
      turn: ''
    };
  });

  // test that on the next step some action is called
  it('and then call the success action with the data returned by the API', result => {
    expect(result).toEqual(put(gameActions.sendPlayersNameSuccess(['X', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], ['Player 1', 'Player 2'], {status: 'running'}, '')));
  });

  it('and then do nothing', result => {
    expect(result).toBeUndefined();
  });
});

