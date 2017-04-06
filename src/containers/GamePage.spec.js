import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

import { GamePage } from './GamePage';
import PlayersForm from '../components/game/PlayersForm';
import GameBoard from '../components/game/GameBoard';
import GameResult from '../components/game/GameResult';
import Leaderboard from '../components/game/Leaderboard';

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();
const middlewares = [
  logger,
  sagaMiddleware,
];

// Use the same middlewares you use with Redux's applyMiddleware
const mockStore = configureMockStore(middlewares);

// Setup the entire state, not just the part Redux passes to the connected component.
const initialState = mockStore({ 
  allPlayers: {},
  game: {},
  routing: {}
});

// GamePage is responsible for render the game grid
describe('<GamePage />', () => {
  let props, mountedGamePage;

  const gamePage = () => {
    if(!mountedGamePage) {
      mountedGamePage = mount(
        <Provider store={initialState}>
          <GamePage {...props} />
        </Provider>
      );
    }
    return mountedGamePage;
  };

  beforeEach(() => {
    props = {
      allPlayers: [],
      game: {
        board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', ],
        players: [],
        result: {status: 'running'},
        turn: ''
      },
      gameActions: {
        newGame: jest.fn(),
        newRound: jest.fn(), 
        registerMove: jest.fn(),
        resetGame: jest.fn(),
        sendPlayersName: jest.fn()
      },
      playersActions: {
        fetchPlayers: jest.fn()
      }
    };
    mountedGamePage = undefined;
  });

  describe('Test methods', () => {
    let gamePageRenderer;
    beforeEach(() => {
      props.playersActions.fetchPlayers = sinon.spy();
      props.gameActions.resetGame = sinon.spy();
      gamePageRenderer = shallow(<GamePage {...props} />);
    });

    describe('componentWillReceiveProps', () => {
      it('should fetch players', () => {
        gamePageRenderer.instance().componentWillReceiveProps({
          game: {
            board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', ],
            players: [],
            result: {status: 'finished', winner: 'X'},
            turn: ''
          }
        });
        expect(props.playersActions.fetchPlayers.callCount).toEqual(1);
      });
    });

    describe('componentWillUnmount', () => {
      it('should reset the game and fetch players when componentWillUnmount', () => {
        gamePageRenderer.instance().componentWillUnmount();
        expect(props.gameActions.resetGame.callCount).toEqual(1);
        expect(props.playersActions.fetchPlayers.callCount).toEqual(1);
      });
    });
  });

  describe('render', () => {
    it('render the GamePage component', () => {
      const gamePageRenderer = shallow(<GamePage {...props} />);
      expect(gamePageRenderer).toMatchSnapshot();
    });

    it('render a div as root element', () => {
      const gamePageElement = gamePage().find('div');
      const wrappingDiv = gamePageElement.first();
      expect(wrappingDiv.children()).toEqual(gamePage().children());
    });

    it('should wrapper has the class game-page', () => {
      const gamePageElement = gamePage().find('div');
      const wrappingDiv = gamePageElement.first();
      expect(wrappingDiv.hasClass('game-page')).toBeTruthy();
    });

    describe('renderContent()', () => {
      it('should render the players form if status is not equal finished or draw', () => {
        let gamePageRenderer = gamePage().find(GamePage);
        let playersForm = gamePageRenderer.find(PlayersForm);
        expect(playersForm.length).toEqual(1);

        props.game.result = {status: 'waiting'};
        gamePageRenderer = gamePage().find(GamePage);
        playersForm = gamePageRenderer.find(PlayersForm);
        expect(playersForm.length).toEqual(1);
      });

      it('should not render the players form if status is finished or draw', () => {
        props.game.result = {status: 'finished'};
        let gamePageRenderer = gamePage().find(GamePage);
        let playersForm = gamePageRenderer.find(PlayersForm);
        expect(playersForm.length).toEqual(0);

        props.game.result = {status: 'draw'};
        gamePageRenderer = gamePage().find(GamePage);
        playersForm = gamePageRenderer.find(PlayersForm);
        expect(playersForm.length).toEqual(0);
      });

      it('should render the game board if status is equal to running', () => {
        props.game.result = {status: 'running'};
        const gamePageRenderer = gamePage().find(GamePage);
        const gameBoard = gamePageRenderer.find(GameBoard);
        expect(gameBoard.length).toEqual(1);
      });

      it('should not render the game board if status is not running', () => {
        props.game.result = {status: 'finished'};
        let gamePageRenderer = gamePage().find(GamePage);
        let gameBoard = gamePageRenderer.find(GameBoard);
        expect(gameBoard.length).toEqual(0);

        props.game.result = {status: 'draw'};
        gamePageRenderer = gamePage().find(GamePage);
        gameBoard = gamePageRenderer.find(GameBoard);
        expect(gameBoard.length).toEqual(0);

        props.game.result = {status: 'waiting'};
        gamePageRenderer = gamePage().find(GamePage);
        gameBoard = gamePageRenderer.find(GameBoard);
        expect(gameBoard.length).toEqual(0);
      });

      it('should render the game result if status is equal finished or draw', () => {
        props.game.result = {status: 'finished'};
        let gamePageRenderer = gamePage().find(GamePage);
        let gameResult = gamePageRenderer.find(GameResult);
        expect(gameResult.length).toEqual(1);

        props.game.result = {status: 'draw'};
        gamePageRenderer = gamePage().find(GamePage);
        gameResult = gamePageRenderer.find(GameResult);
        expect(gameResult.length).toEqual(1);
      });

      it('should not render the game result if status is not finished or draw', () => {
        props.game.result = {status: 'running'};
        let gamePageRenderer = gamePage().find(GamePage);
        let gameResult = gamePageRenderer.find(GameResult);
        expect(gameResult.length).toEqual(0);

        props.game.result = {status: 'waiting'};
        gamePageRenderer = gamePage().find(GamePage);
        gameResult = gamePageRenderer.find(GameResult);
        expect(gameResult.length).toEqual(0);
      });
    });

    describe('renderLeaderboard()', () => {
      it('should not render the leaderboard if allPlayers length is equal 0', () => {
        const gamePageRenderer = gamePage().find(GamePage);
        const leaderboard = gamePageRenderer.find(Leaderboard);
        expect(leaderboard.length).toEqual(0);
      });

      it('should render the leaderboard if allPlayers length is higher than 0', () => {
        props.allPlayers = [{name: 'Player 1', wins: 0, defeats: 0, draws: 0}];
        const gamePageRenderer = gamePage().find(GamePage);
        const leaderboard = gamePageRenderer.find(Leaderboard);
        expect(leaderboard.length).toEqual(1);
      });
    });
  });
});