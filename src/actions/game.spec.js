import GameCreators from './game';

describe('game actions', () => {
  // NEW GAME ACTIONS
  it('should create an action to new game', () => {
    expect(GameCreators.newGame).toBeDefined();
    expect(GameCreators.newGame()).toEqual({type: 'NEW_GAME'});
  });

  it('should create an action to new game succcess', () => {
    expect(GameCreators.newGameSuccess).toBeDefined();
    expect(GameCreators.newGameSuccess(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], [], {}, '')).toEqual({
      type: 'NEW_GAME_SUCCESS',
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: [],
      result: {},
      turn: ''
    });
    expect(GameCreators.newGameSuccess(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], [], {result: 'waiting'}, '')).toEqual({
      type: 'NEW_GAME_SUCCESS',
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: [],
      result: {result: 'waiting'},
      turn: ''
    });
  });

  it('should create an action to new game failure', () => {
    expect(GameCreators.newGameFailure).toBeDefined();
    expect(GameCreators.newGameFailure()).toEqual({type: 'NEW_GAME_FAILURE'});
  });

  // NEW ROUND ACTIONS
  it('should create an action to new round', () => {
    expect(GameCreators.newRound).toBeDefined();
    expect(GameCreators.newRound()).toEqual({type: 'NEW_ROUND'});
  });

  it('should create an action to new round succcess', () => {
    expect(GameCreators.newRoundSuccess).toBeDefined();
    expect(GameCreators.newRoundSuccess(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], [], {}, '')).toEqual({
      type: 'NEW_ROUND_SUCCESS',
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: [],
      result: {},
      turn: ''
    });
    expect(GameCreators.newRoundSuccess(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], [], {result: 'waiting'}, '')).toEqual({
      type: 'NEW_ROUND_SUCCESS',
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: [],
      result: {result: 'waiting'},
      turn: ''
    });
  });
  
  it('should create an action to new round failure', () => {
    expect(GameCreators.newRoundFailure).toBeDefined();
    expect(GameCreators.newRoundFailure()).toEqual({type: 'NEW_ROUND_FAILURE'});
  });

  // SEND PLAYERS NAME ACTIONS
  it('should create an action to send the players name', () => {
    expect(GameCreators.sendPlayersName).toBeDefined();
    expect(GameCreators.sendPlayersName('Player 1', 'Player 2')).toEqual({
      type: 'SEND_PLAYERS_NAME',
      playerX: 'Player 1',
      playerO: 'Player 2'
    });
  });

  it('should create an action to send the players name succcess', () => {
    expect(GameCreators.sendPlayersNameSuccess).toBeDefined();
    expect(GameCreators.sendPlayersNameSuccess(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], [], {status: 'running'}, 'X')).toEqual({
      type: 'SEND_PLAYERS_NAME_SUCCESS',
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: [],
      result: {status: 'running'},
      turn: 'X'
    });
  });
  
  it('should create an action to send the players name failure', () => {
    expect(GameCreators.sendPlayersNameFailure).toBeDefined();
    expect(GameCreators.sendPlayersNameFailure()).toEqual({type: 'SEND_PLAYERS_NAME_FAILURE'});
  });

  // REGISTER MOVE ACTIONS
  it('should create an action to register the player move', () => {
    expect(GameCreators.registerMove).toBeDefined();
    expect(GameCreators.registerMove(0)).toEqual({
      type: 'REGISTER_MOVE',
      position: 0
    });
  });

  it('should create an action to register the player move succcess', () => {
    expect(GameCreators.registerMoveSuccess).toBeDefined();
    expect(GameCreators.registerMoveSuccess(['X', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'], [], {status: 'running'}, 'O')).toEqual({
      type: 'REGISTER_MOVE_SUCCESS',
      board: ['X', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: [],
      result: {status: 'running'},
      turn: 'O'
    });
  });
  
  it('should create an action to register the player move failure', () => {
    expect(GameCreators.registerMoveFailure).toBeDefined();
    expect(GameCreators.registerMoveFailure()).toEqual({type: 'REGISTER_MOVE_FAILURE'});
  });
});

