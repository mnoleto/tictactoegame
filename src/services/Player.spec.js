import Player from './Player';

// Player class is responble for control the players
// CONTRACT
// 1. Should have a initial state
// 2. Should add a player by name
//    Should add only strings as name
//    Should insert a player with 0 wins, 0 defeats and 0 draws at first
// 3. Should set the game result for a player and increase wins or defeats or draws
// 4. Should get the players object

describe('Player', () => {
  let PlayerApi;
  const INITIAL_STATE = {name: '', wins: 0, defeats: 0, draws: 0};

  beforeEach(() => {
    PlayerApi = new Player('John');
  });

  it('Api exist', () => {
    expect(PlayerApi).toBeDefined();
  });

  it('constructor', () => {
    expect(PlayerApi.INITIAL_STATE).toEqual(INITIAL_STATE);
    expect(PlayerApi._player).toEqual({"defeats": 0, "draws": 0, "name": "John", "wins": 0});
  });

  // GETS AND SETTERS
  it('get and set name', () => {
    PlayerApi.name = 'Player';
    expect(PlayerApi.name).toEqual('Player');

    PlayerApi.name = 'Second Player';
    expect(PlayerApi.name).toEqual('Second Player');
  });

  it('get and set player', () => {
    PlayerApi.player = {wins: 3};
    expect(PlayerApi.player).toEqual({ name: 'John', wins: 3, defeats: 0, draws: 0 });

    PlayerApi.player = {defeats: 5};
    expect(PlayerApi.player).toEqual({ name: 'John', wins: 3, defeats: 5, draws: 0 });
  });

  it('add', () => {
    expect(PlayerApi.add).toBeDefined();

    PlayerApi.add('Mark');
    expect(PlayerApi._player).toEqual({"defeats": 0, "draws": 0, "name": "Mark", "wins": 0});

    PlayerApi.add(3);
    expect(PlayerApi._player).toEqual({"defeats": 0, "draws": 0, "name": "3", "wins": 0});
  });

  it('should insert a player with 0 wins, 0 defeats and 0 draws', () => {
    expect(PlayerApi._player.wins).toEqual(0);
    expect(PlayerApi._player.defeats).toEqual(0);
    expect(PlayerApi._player.draws).toEqual(0);

    PlayerApi.add('Player 2');
    expect(PlayerApi._player.wins).toEqual(0);
    expect(PlayerApi._player.defeats).toEqual(0);
    expect(PlayerApi._player.draws).toEqual(0);
  });

  it('increaseScore', () => {
    expect(PlayerApi.increaseScore).toBeDefined();

    PlayerApi.increaseScore('wins');
    expect(PlayerApi._player.wins).toEqual(1);
    expect(PlayerApi._player.defeats).toEqual(0);
    expect(PlayerApi._player.draws).toEqual(0);

    PlayerApi.increaseScore('wins');
    expect(PlayerApi._player.wins).toEqual(2);
    expect(PlayerApi._player.defeats).toEqual(0);
    expect(PlayerApi._player.draws).toEqual(0);

    PlayerApi.increaseScore('defeats');
    expect(PlayerApi._player.wins).toEqual(2);
    expect(PlayerApi._player.defeats).toEqual(1);
    expect(PlayerApi._player.draws).toEqual(0);

    PlayerApi.increaseScore('draws');
    expect(PlayerApi._player.wins).toEqual(2);
    expect(PlayerApi._player.defeats).toEqual(1);
    expect(PlayerApi._player.draws).toEqual(1);
  });
});