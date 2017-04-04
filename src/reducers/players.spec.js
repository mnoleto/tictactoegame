import reducer from './players';
import Types from './actionTypes';

describe('players reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({ error: false, data: [] });
  });

  it('should handle the FETCH_PLAYERS', () => {
    expect(reducer({}, {type: Types.FETCH_PLAYERS})).toEqual({error: false});
  });

  it('should handle the FETCH_PLAYERS_SUCCESS', () => {
    expect(reducer({}, {type: Types.FETCH_PLAYERS_SUCCESS, data: ['Player 1', 'Player 2']})).toEqual({error: false, data: ['Player 1', 'Player 2']});
    expect(reducer({data: ['Player 1', 'Player 2']}, {type: Types.FETCH_PLAYERS_SUCCESS, data: ['Player 3', 'Player 4']})).toEqual({error: false, data: ['Player 3', 'Player 4']});
  });

  it('should handle the FETCH_PLAYERS_FAILURE', () => {
    expect(reducer({}, {type: Types.FETCH_PLAYERS_FAILURE})).toEqual({error: true});
  });
});