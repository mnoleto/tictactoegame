import PlayersCreators from './players';

describe('players actions', () => {
  // FETCH PLAYERS ACTIONS
  it('should create an action to fetch players', () => {
    expect(PlayersCreators.fetchPlayers).toBeDefined();
    expect(PlayersCreators.fetchPlayers()).toEqual({type: 'FETCH_PLAYERS'});
  });

  it('should create an action to fetch players succcess', () => {
    expect(PlayersCreators.fetchPlayersSuccess).toBeDefined();
    expect(PlayersCreators.fetchPlayersSuccess([{name: 'Player 1', wins: 0, defeats: 0, draws: 0}, {name: 'Player 2', wins: 0, defeats: 0, draws: 0}])).toEqual({
      type: 'FETCH_PLAYERS_SUCCESS',
      data: [{name: 'Player 1', wins: 0, defeats: 0, draws: 0}, {name: 'Player 2', wins: 0, defeats: 0, draws: 0}]
    });
  });

  it('should create an action to fetch players failure', () => {
    expect(PlayersCreators.fetchPlayersFailure).toBeDefined();
    expect(PlayersCreators.fetchPlayersFailure()).toEqual({type: 'FETCH_PLAYERS_FAILURE'});
  });
});

