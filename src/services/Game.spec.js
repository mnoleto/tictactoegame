import Game from './Game';
import Player from './Player';

// Game class is responsible for control the game
// CONTRACTS
// 1. Should start the game
//    Should change the game status
//    Should create the board with empty spaces
//    Should set the first player turn
// 2. Should insert two players
//    Should return the players saved name
//    Should generate a default name if receives empty
// 3. Should check if the player already exist before insert
// 4. Should allow to register moves
//    Should register moves only to existing cells
//    Should register moves only to empty cells
//    Should save the players moves on the board
//    Should check if the game is finished
//    Should increment the move counter
//    Should return the result
// 4.1. If is finished
//      Should test the rows for a winner
//      Should test the cols for a winner
//      Should test the diagonal for a winner
//      Should set the winner and loser names or return if is a draw
//      Should change the game result
// 4.2. If is not finished
//      Should increase the move counter
//      Should alternate the players turns
// 5. Should check if the game
//    Should only check if is finished after 5 moves
//    Should set the result - who is the winner and loser or return if is a draw
// 6. Should reset the players
// 7. Should reset the game

describe('Game', () => {
  let GameApi;
  const INITIAL_STATE = {name: '', wins: 0, defeats: 0, draws: 0};

  beforeEach(() => {
    GameApi = new Game('Player 1', 'Player 2');
  });

  it('Api exist', () => {
    expect(GameApi).toBeDefined();
  });

  it('constructor', () => {
    expect(GameApi._grid).toEqual(3);
    expect(GameApi.moves).toEqual(0);
    expect(GameApi.result).toEqual({status: 'waiting'});
  });

  // GETS AND SETTERS
  it('get and set board', () => {
    GameApi.board = ['E'];
    expect(GameApi.board).toEqual(['E']);

    GameApi.board = ['O'];
    expect(GameApi.board).toEqual(['O']);
  });

  it('get and set moves', () => {
    GameApi.moves = 1;
    expect(GameApi.moves).toEqual(1);

    GameApi.moves = 2;
    expect(GameApi.moves).toEqual(2);
  });

  it('get and set players', () => {
    GameApi.players = ['Player 1', 'Player 2'];
    expect(GameApi.players).toEqual(['Player 1', 'Player 2']);

    GameApi.players = ['Player 3', 'Player 4'];
    expect(GameApi.players).toEqual(['Player 3', 'Player 4']);
  });

  it('get and set result', () => {
    GameApi.result = {status: 'running'};
    expect(GameApi.result).toEqual({status: 'running'});

    GameApi.result = {status: 'finished'};
    expect(GameApi.result).toEqual({status: 'finished'});
  });

  it('get and set turn', () => {
    GameApi.turn = 'O';
    expect(GameApi.turn).toEqual('O');

    GameApi.turn = 'X';
    expect(GameApi.turn).toEqual('X');
  });

  // METHODS
  it('alternateTurns', () => {
    expect(GameApi.alternateTurns).toBeDefined();
    expect(GameApi.turn).toEqual('X');

    GameApi.alternateTurns();
    expect(GameApi.turn).toEqual('O');

    GameApi.alternateTurns();
    expect(GameApi.turn).toEqual('X');
  });

  it('emptyBoard', () => {
    expect(GameApi.emptyBoard).toBeDefined();
    GameApi.emptyBoard();
    expect(GameApi.board).toEqual(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
  });

  it('existingPlayer', () => {
    expect(GameApi.existingPlayer).toBeDefined();

    GameApi.startGame('Player 1', 'Player 2');

    expect(GameApi.existingPlayer('Player 1')).toBeTruthy();
    expect(GameApi.existingPlayer('Player 3')).toBeFalsy();
  });

  it('fetchPlayers', () => {
    expect(GameApi.fetchPlayers).toBeDefined();

    GameApi.startGame('Player 1', 'Player 2');
    expect(GameApi.fetchPlayers()).toEqual([
      Object.assign({}, INITIAL_STATE, {name: 'Player 1'}), 
      Object.assign({}, INITIAL_STATE, {name: 'Player 2'})]);
  });

  it('generateName', () => {
    expect(GameApi.generateName).toBeDefined();
    expect(GameApi.generateName()).toEqual('Player 1');
  });

  it('getPlayerByName', () => {
    expect(GameApi.getPlayerByName).toBeDefined();
    GameApi.startGame('Player 1', 'Player 2');
    expect(GameApi.getPlayerByName('Player 2')).toEqual(new Player('Player 2'));
    expect(GameApi.getPlayerByName('Player 1')).toEqual(new Player('Player 1'));
    expect(GameApi.getPlayerByName('Player 3')).toBeUndefined();
  });

  it('isFinished', () => {
    expect(GameApi.isFinished).toBeDefined();
  });

  describe('isFinished possibilities', () => {
    beforeEach(() => {
      GameApi.startGame('Player 1', 'Player 2');
    });

    it('finish the row game after 5 moves', () => {
      GameApi.registerMove(0);
      expect(GameApi.result).toEqual({status: 'running'});
      GameApi.registerMove(3);
      GameApi.registerMove(1);
      GameApi.registerMove(8);
      GameApi.registerMove(2);
      expect(GameApi.result).toEqual({status: 'finished', winner: 'X'});
    });
    
    it('finish the column game after 7 moves', () => {
      GameApi.registerMove(0);
      GameApi.registerMove(3);
      GameApi.registerMove(1);
      GameApi.registerMove(8);
      GameApi.registerMove(4);
      expect(GameApi.result).toEqual({status: 'running'});

      GameApi.registerMove(7);
      GameApi.registerMove(2);
      expect(GameApi.result).toEqual({status: 'finished', winner: 'X'});
    });

    it('finish the diagonal after 9 moves', () => {
      GameApi.registerMove(0);
      GameApi.registerMove(6);
      GameApi.registerMove(4);
      GameApi.registerMove(3);
      GameApi.registerMove(2);
      GameApi.registerMove(1);
      GameApi.registerMove(7);
      GameApi.registerMove(5);
      GameApi.registerMove(8);
      expect(GameApi.result).toEqual({status: 'finished', winner: 'X'});
    });

    it('it draws after 9 moves', () => {
      GameApi.registerMove(0);
      GameApi.registerMove(6);
      GameApi.registerMove(4);
      GameApi.registerMove(3);
      GameApi.registerMove(2);
      GameApi.registerMove(1);
      GameApi.registerMove(7);
      GameApi.registerMove(8);
      GameApi.registerMove(5);
      expect(GameApi.result).toEqual({status: 'draw'});
    });
  });

  it('insertPlayers', () => {
    expect(GameApi.insertPlayers).toBeDefined();
    expect(GameApi.insertPlayers('Player 1', 'Player 2')).toEqual(['Player 1', 'Player 2']);
    expect(GameApi.players).toEqual([
      new Player('Player 1'), 
      new Player('Player 2')
    ]);

    expect(GameApi.insertPlayers('Player 3', 'Player 4')).toEqual(['Player 3', 'Player 4']);
    expect(GameApi.players).toEqual([
      new Player('Player 1'), 
      new Player('Player 2'),
      new Player('Player 3'), 
      new Player('Player 4')
    ]);

    expect(GameApi.insertPlayers('')).toEqual(['Player 5', 'Player 6']);
  });

  it('newGame', () => {
    expect(GameApi.newGame).toBeDefined();
    expect(GameApi.newGame()).toEqual({
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: [],
      result: {status: 'waiting'},
      turn: ''
    });
  });

  it('newRound', () => {
    expect(GameApi.newRound).toBeDefined();
    GameApi.startGame('Player 1', 'Player 2');
    expect(GameApi.activePlayers).toEqual(['Player 1', 'Player 2']);
    expect(GameApi.newRound()).toEqual({
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: ['Player 2', 'Player 1'],
      result: {status: 'waiting'},
      turn: ''
    });
  });

  it('registerMove', () => {
    expect(GameApi.registerMove).toBeDefined();

    GameApi.startGame();

    GameApi.registerMove(0);
    expect(GameApi.board[0]).toEqual('X');
    expect(GameApi.moves).toEqual(1);

    GameApi.registerMove(1);
    expect(GameApi.board[1]).toEqual('O');
    expect(GameApi.moves).toEqual(2);

    GameApi.registerMove(12);
    expect(GameApi.board[12]).toBeUndefined();
    expect(GameApi.moves).toEqual(2);

    GameApi.registerMove(1);
    expect(GameApi.board[1]).toEqual('O');
    expect(GameApi.moves).toEqual(2);

    GameApi.registerMove(3);
    expect(GameApi.registerMove(6)).toEqual({
      'board': ['X', 'O', 'E', 'X', 'E', 'E', 'O', 'E', 'E'],
      'players': ['Player 1', 'Player 2'],
      'result': {'status': 'running'},
      'turn': 'X'
    });
    expect(GameApi.moves).toEqual(4);
  });

  it('resetGame', () => {
    expect(GameApi.resetGame).toBeDefined();
    GameApi.startGame('Player 1', 'Player 2');
    GameApi.resetGame();
    expect(GameApi.activePlayers).toEqual([]);
    expect(GameApi.board).toEqual(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
    expect(GameApi.moves).toEqual(0);
    expect(GameApi.result).toEqual({status: 'waiting'});
    expect(GameApi.turn).toEqual('');
  });

  it('resetRound', () => {
    expect(GameApi.resetRound).toBeDefined();

    GameApi.resetGame();
    expect(GameApi.board).toEqual(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
    expect(GameApi.moves).toEqual(0);
    expect(GameApi.result).toEqual({status: 'waiting'});
    expect(GameApi.turn).toEqual('');
  });

  it('resetPlayers', () => {
    expect(GameApi.resetPlayers).toBeDefined();
    GameApi.resetPlayers();
    expect(GameApi.fetchPlayers()).toEqual([]);
  });

  it('startGame', () => {
    expect(GameApi.startGame('Player 1' , 'Player 2')).toEqual({
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      turn: 'X',
      result: {status: 'running'},
      players: ['Player 1', 'Player 2']
    });

    expect(GameApi.startGame('Player 3' , 'Player 4')).toEqual({
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      turn: 'X',
      result: {status: 'running'},
      players: ['Player 3', 'Player 4']
    });

    expect(GameApi.startGame('' , '')).toEqual({
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      turn: 'X',
      result: {status: 'running'},
      players: ['Player 5', 'Player 6']
    });

    expect(GameApi.startGame('Player 1' , 'Player 3')).toEqual({
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'],
      players: ['Player 1', 'Player 3'],
      result: {status: 'running'},
      turn: 'X'
    });
  });

  it('test games with diferent players', () => {
    GameApi.startGame('Player 1', 'Player 2');
    GameApi.registerMove(0); // X start
    GameApi.registerMove(1);
    GameApi.registerMove(4);
    GameApi.registerMove(5);
    GameApi.registerMove(8); // X win
    GameApi.newGame();
    GameApi.startGame('Player 3', 'Player 4');
    GameApi.registerMove(0); // X start
    GameApi.registerMove(1);
    GameApi.registerMove(4);
    GameApi.registerMove(5);
    GameApi.registerMove(8); // X win
    GameApi.newGame();
  });
});