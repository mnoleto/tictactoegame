/*
 * Constructs a player array and is responsible to count the number of wins, defeats and draws
 */
class Players {
  constructor(playerName) {
    this.INITIAL_STATE = {name: '', wins: 0, defeats: 0, draws: 0}; // initial state of each player
    this._player = {};

    this.add(playerName);
  }

  /*
   * public function that add a player to the players array
   * @param playerName [String]: player name
   * @return playerName [String]: return the saved name
   */
  add(playerName) {
    let name = String(playerName);
    this._player = Object.assign({}, this.INITIAL_STATE, {name});
  }

  /*
   * public function that returns the player name
   * @return playerName [String]: return the saved name
   */
  get name() {
    return this._player.name;
  }

  /*
   * public function that returns the player name
   * @return playerName [String]: return the saved name
   */
  get player() {
    return this._player;
  }

  /*
   * public function that increase the player wins, defeats or draws
   * @param playerName [String]: player name
   * @param type [String]: type of result to be increased - wins, defeats or draws
   */
  // increaseScore(type) {
  //   let property = {};
  //   property[type] = this._player[type] + 1;
  //   this._players = Object.assign({}, this._player, property);
  // }

  /*
   * public function that set the result of a match
   * @param type [String]: type of result (wins, defeats or draws)
   */
  setResult(type) {
    let property = {};
    property[type] = this._player[type] + 1;
    this._player = Object.assign({}, this._player, property);
  }
}

export default Players;
