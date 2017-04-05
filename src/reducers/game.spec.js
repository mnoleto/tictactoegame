import reducer from './game';
import Types from './actionTypes';

describe('games reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({board: [], players: [], result: {}, turn: ''});
  });

  it('should handle the NEW_GAME', () => {
    expect(reducer({}, {type: Types.NEW_GAME})).toEqual({});
  });

  it('should handle the NEW_GAME_SUCCESS', () => {
    expect(reducer({}, {
        type: Types.NEW_GAME_SUCCESS,
        board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'e'],
        players: ['Player 1', 'Player 2'],
        result: {status: 'running'},
        turn: 'X'
    })).toEqual({
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'e'],
      players: ['Player 1', 'Player 2'],
      result: {status: 'running'},
      turn: 'X'
    });
  });

  it('should handle the NEW_ROUND', () => {
    expect(reducer({}, {type: Types.NEW_ROUND})).toEqual({});
  });

  it('should handle the NEW_ROUND_SUCCESS', () => {
    expect(reducer({}, {
        type: Types.NEW_ROUND_SUCCESS,
        board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'e'],
        players: ['Player 1', 'Player 2'],
        result: {status: 'running'},
        turn: 'X'
    })).toEqual({
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'e'],
      players: ['Player 1', 'Player 2'],
      result: {status: 'running'},
      turn: 'X'
    });
  });

  it('should handle the SEND_PLAYERS_NAME', () => {
    expect(reducer({}, {type: Types.SEND_PLAYERS_NAME, playerX: 'Player 1', playerO: 'Player 2'})).toEqual({
      players: ['Player 1', 'Player 2']
    });
  });

  it('should handle the SEND_PLAYERS_NAME_SUCCESS', () => {
    expect(reducer({}, {
        type: Types.SEND_PLAYERS_NAME_SUCCESS,
        board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'e'],
        players: ['Player 1', 'Player 2'],
        result: {status: 'running'},
        turn: 'X'
    })).toEqual({
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'e'],
      players: ['Player 1', 'Player 2'],
      result: {status: 'running'},
      turn: 'X'
    });
  });

  it('should handle the REGISTER_MOVE', () => {
    expect(reducer({}, {type: Types.REGISTER_MOVE})).toEqual({});
  });

  it('should handle the REGISTER_MOVE_SUCCESS', () => {
    expect(reducer({}, {
        type: Types.REGISTER_MOVE_SUCCESS,
        board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'e'],
        players: ['Player 1', 'Player 2'],
        result: {status: 'running'},
        turn: 'X'
    })).toEqual({
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'e'],
      players: ['Player 1', 'Player 2'],
      result: {status: 'running'},
      turn: 'X'
    });
  });
});