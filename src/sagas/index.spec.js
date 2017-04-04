import { apply, call, put, takeLatest } from 'redux-saga/effects';
import GameApi from '../services/Game';
import { fetchPlayers } from '../sagas';

const Api = new GameApi();

describe('gameSaga', () => {
  it('should fetch players', () => {
    const mockAction = [];
    const generator  = fetchPlayers(mockAction);

    // Check that Saga asks to call the API
    expect(generator.next().value).toEqual(apply(Api, Api.fetchPlayers, mockAction));

    // Check that Saga reacts correctly to the failure
    expect(
      generator.throw({
        error: 'user not found'
      }).value
    ).toEqual(
      put({
        type: 'FETCH_PLAYERS_FAILURE'
      })
    );
  });
});