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

  // it('increaseScore', () => {
  //   expect(PlayerApi.increaseScore).toBeDefined();
  //   PlayerApi.increaseScore('John', 'wins');
  //   expect(PlayerApi._players[0].wins).toEqual(1);
  //   expect(PlayerApi._players[0].defeats).toEqual(0);
  //   expect(PlayerApi._players[0].draws).toEqual(0);

  //   PlayerApi.add('Player 2');
  //   PlayerApi.increaseScore('Player 2', 'defeats');
  //   expect(PlayerApi._players[1].defeats).toEqual(1);
  //   expect(PlayerApi._players[1].wins).toEqual(0);
  //   expect(PlayerApi._players[1].draws).toEqual(0);


  //   PlayerApi.increaseScore('Player 2', 'wins');
  //   expect(PlayerApi._players[1].defeats).toEqual(1);
  //   expect(PlayerApi._players[1].wins).toEqual(1);
  //   expect(PlayerApi._players[1].draws).toEqual(0);

  //   PlayerApi.increaseScore('Player 2', 'wins');
  //   expect(PlayerApi._players[1].defeats).toEqual(1);
  //   expect(PlayerApi._players[1].wins).toEqual(2);
  //   expect(PlayerApi._players[1].draws).toEqual(0);

  //   PlayerApi.increaseScore('John', 'draws');
  //   expect(PlayerApi._players[0].wins).toEqual(1);
  //   expect(PlayerApi._players[0].defeats).toEqual(0);
  //   expect(PlayerApi._players[0].draws).toEqual(1);
  // });

  // it('setResult', () => {
  //   expect(PlayerApi.setResult).toBeDefined();
    
  //   PlayerApi.insertPlayer('Player 1', 'Player 2');
  //   PlayerApi.setResult({winner: 'Player 1', loser: 'Player 2'});
  //   expect(PlayerApi._players[0]).toEqual({name: 'Player 1', wins: 1, defeats: 0, draws: 0});
  //   expect(PlayerApi._players[1]).toEqual({name: 'Player 2', wins: 0, defeats: 1, draws: 0});

  //   PlayerApi.setResult({winner: 'Player 1', loser: 'Player 2'});
  //   expect(PlayerApi._players[0]).toEqual({name: 'Player 1', wins: 2, defeats: 0, draws: 0});
  //   expect(PlayerApi._players[1]).toEqual({name: 'Player 2', wins: 0, defeats: 2, draws: 0});

  //   PlayerApi.setResult({winner: 'Player 2', loser: 'Player 1'});
  //   expect(PlayerApi._players[0]).toEqual({name: 'Player 1', wins: 2, defeats: 1, draws: 0});
  //   expect(PlayerApi._players[1]).toEqual({name: 'Player 2', wins: 1, defeats: 2, draws: 0});

  //   PlayerApi.setResult({draw: ['Player 2', 'Player 1']});
  //   expect(PlayerApi._players[0]).toEqual({name: 'Player 1', wins: 2, defeats: 1, draws: 1});
  //   expect(PlayerApi._players[1]).toEqual({name: 'Player 2', wins: 1, defeats: 2, draws: 1});
  // });
});