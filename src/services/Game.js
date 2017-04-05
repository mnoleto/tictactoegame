import Player from './Player';

class Game {
  /*
   * constructor
   */
  constructor() {
    this._activePlayers = [];
    this._board = [];
    this._grid = 3; // default 3x3 board _grid
    this._moves = 0;
    this._players = [];
    this._result = {status: 'waiting'}; // stores the result of the game
    this._turn = 'X';
  }

  // GETS AND SETTERS
  /*
   * function responsible for get the _activePlayers value
   * @return _activePlayers [Array]
   */
  get activePlayers() {
    return this._activePlayers;
  }

  /*
   * function responsible for set the _activePlayers value
   * @param value [Array]
   */
  set activePlayers(value) {
    this._activePlayers = value;
  }
  /*
   * function responsible for get the _board value
   * @return _board [Array]
   */
  get board() {
    return this._board;
  }

  /*
   * function responsible for set the _board value
   * @param value [Array]
   */
  set board(value) {
    this._board = value;
  }

  /*
   * function responsible for get the _moves value
   * @return _moves [Number]
   */
  get moves() {
    return this._moves;
  }

  /*
   * function responsible for set the _moves value
   * @param value [Number]
   */
  set moves(value) {
    this._moves = value;
  }

  /*
   * function responsible for get the _players value
   * @return _players [Array]
   */
  get players() {
    return this._players;
  }

  /*
   * function responsible for set the _players value
   * @param value [Array]
   */
  set players(value) {
    this._players = value;
  }

  /*
   * function responsible for get the _result value
   * @return _result [Object]
   */
  get result() {
    return this._result;
  }

  /*
   * function responsible for set the _result value
   * @param value [Object]
   */
  set result(value) {
    this._result = value;
  }

  /*
   * function responsible for get the _turn value
   * @return _turn [String]
   */
  get turn() {
    return this._turn;
  }

  /*
   * function responsible for set the _turn value
   * @param value [String]
   */
  set turn(value) { 
    this._turn = value;
  }

  // METHODS
  /*
   * public function that advance to the next turn
   */
  alternateTurns() {
    this.turn = (this.turn === 'X' ? 'O' : 'X');
  }

  /*
   * public function that fill the board with empty spaces
   */
  emptyBoard() {
    this.board = ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E'];
  }

  /*
   * public function that check if the player already exist
   * @param playerName [String]: player name
   * @returns [Boolean]: true if exist, false if not
   */
  existingPlayer(playerName) {
    if(this.players.length > 0) {
      let player = this.players.find((value) => {
        if(value.name === playerName) {
          return value;
        }
      });
      return (player) ? true : false;
    }
    return false;
  }

  /*
   * public function that returns the array of players
   * @return players [Array]: array of registered players
   */
  fetchPlayers() {
    if(this.players.length === 0) { return []; }
    return this.players.map((value) => value._player);
  }

  /*
   * public function that generate names in sequence
   * @return name [String]: name generated using the array of players length
   */
  generateName() {
    return ('Player ' + (this.players.length + 1));
  }

  /*
   * public function that return a player by a givin
   * @return name [String]: name generated using the array of players length
   */
  getPlayerByName(playerName) {
    return this.players.find((value) => {
      return (value._player.name === playerName);
    });
  }

  /*
   * public function that check if the game is finished after each move and store the result
   * @return result [Boolean]: true if the game is finished or false if is not
   */
  isFinished() {
    // after the first player third move, checks if anybody wan the game
    if(this.moves >= 5) {
      let i, j;

      // check rows
      for(i = 0; i < 6; i = i + 3) {
        if(this.board[i] !== 'E' && this.board[i] === this.board[i + 1] && this.board[i + 1] == this.board[i + 2]) {
          this.updatePlayerScore(this.result = {
            status: 'finished',
            winner: this.board[i]
          });
          return true;
        }
      }

      // check cols
      for(i = 0; i <= 2; i ++) {
        if(this.board[i] !== 'E' && this.board[i] === this.board[i + 3] && this.board[i + 3] == this.board[i + 6]) {
          this.updatePlayerScore(this.result = {
            status: 'finished',
            winner: this.board[i]
          });
          return true;
        }
      }

      // check diagonals
      for(i = 0, j = 4; i <= 2; i = i + 2, j = j - 2) {
        if(this.board[i] !== 'E' && this.board[i] === this.board[i + j] && this.board[i + j] == this.board[i + 2*j]) {
          this.updatePlayerScore(this.result = {
            status: 'finished',
            winner: this.board[i]
          });
          return true;
        }
      }

      if(this.moves === 9) {
        this.updatePlayerScore(this.result = {
          status: 'draw'
        });
        return true;
      }
    }

    // if there is not winner, the game is still running and the next player shoul move
    this.result = {status: 'running'};

    return false;
  }

  /*
   * public function that insert two players to the players array
   * @param playerX [String]: player X name
   * @param playerO [String]: player O name
   */
  insertPlayers(playerX, playerO) {
    let nameX = playerX, nameO = playerO;
    if(!playerX || playerX === '' || !this.existingPlayer(playerX)) {
      nameX = (playerX === '' || !playerX) ? this.generateName() : playerX;
      this._players.push(new Player(nameX));
    }

    if(!playerO || playerO === '' || !this.existingPlayer(playerO)) {
      nameO = (playerO === '' || !playerO) ? this.generateName() : playerO;
      this._players.push(new Player(nameO));
    }
    this.activePlayers = [nameX, nameO];
    return this.activePlayers;
  }

  /*
   * public function that ends a game and prepare for start a new one
   * @return game [String]: board reset, players empty, result waiting and turn empty
   */
  newGame() {
    this.resetGame();

    return {
      board: this.board,
      players: this.activePlayers,
      result: this.result,
      turn: this.turn
    };
  }

  /*
   * public function that ends a round, switch players and prepare for start a new round
   * @return game [String]: board reset, players empty, result waiting and turn empty
   */
  newRound() {
    this.resetRound();

    return {
      board: this.board,
      players: [this.activePlayers[1], this.activePlayers[0]],
      result: this.result,
      turn: this.turn
    };
  }

  /*
   * public function that start the game
   * @param letter [String]: X or O as possible letters
   * @return game [Object]: if the game is running - send the next turn; if is finished - send the winner
   */
  registerMove(position) {
    if(position < Math.pow(this._grid, 2) && this.board[position] === 'E' ) {
      this.board = this.board.map((value, index) => index === position ? this.turn : value);
      this.moves ++;
      this.alternateTurns();
      this.isFinished();
    }
    
    return {
      board: this.board,
      players: this.activePlayers,
      result: this.result,
      turn: this.turn
    };
  }

  /*
   * public function that reset the game to its initial state
   */
  resetGame() {
    this.activePlayers = [];
    this.moves = 0;
    this.emptyBoard();
    this.players = [];
    this.result = {status: 'waiting'};
    this.turn = '';
  }

  /*
   * public function that reset the round to its initial state
   */
  resetRound() {
    this.moves = 0;
    this.emptyBoard();
    this.result = {status: 'waiting'};
    this.turn = '';
  }

  /*
   * public function that start the game
   * @param players [Array]: playerX and playerO
   */
  startGame(playerX, playerO) {
    this.resetRound();

    this.turn = 'X';
    this.result = {status: 'running'};

    return {
      board: this.board,
      players: this.insertPlayers(playerX, playerO),
      result: this.result,
      turn: this.turn
    };
  }

  updatePlayerScore(result) {
    let playerX = this.getPlayerByName(this.activePlayers[0]),
      playerO = this.getPlayerByName(this.activePlayers[1]);

    if(result.status === 'draw') {
      playerX.increaseScore('draws');
      playerO.increaseScore('draws');
    } else {
      if(result.winner === 'X') {
        playerX.increaseScore('wins');
        playerO.increaseScore('defeats');
      } else {
        playerX.increaseScore('defeats');
        playerO.increaseScore('wins');
      }
    }
  }
}

export default Game;