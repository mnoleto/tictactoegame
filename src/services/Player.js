/*
 * Constructs a player array and is responsible to count the number of wins, defeats and draws
 */
class Players {
  constructor(playerName) {
    this.INITIAL_STATE = {name: '', wins: 0, defeats: 0, draws: 0}; // initial state of each player
    this._player = {};

    this.add(playerName);
  }


  // GETS AND SETTERS

  /*
   * public function that returns the player name
   * @return playerName [String]: return the saved name
   */
  get name() {
    return this._player.name;
  }

  /*
   * public function that set the player name
   * @param value [String]: player name
   */
  set name(value) {
    this._player = Object.assign({}, this.INITIAL_STATE, {name: value});
  }

  /*
   * public function that returns the player
   * @return playerName [String]: return the saved name
   */
  get player() {
    return this._player;
  }

  /*
   * public function that set the player value
   * @param value [Object]: object with name, wins, defeats and draws
   */
  set player(value) {
    this._player = Object.assign({}, this._player, value);
  }

  // METHODS
  /*
   * public function that add a player properties
   * @param playerName [String]: player name
   * @return playerName [String]: return the saved name
   */
  add(playerName) {
    this.name = String(playerName);
  }

  /*
   * public function that increase the player wins, defeats or draws
   * @param type [String]: type of result to be increased - wins, defeats or draws
   */
  increaseScore(type) {
    let newScore = this._player[type] + 1;
    this.player = {[type]: newScore};
  }
}

export default Players;
