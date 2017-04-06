import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import GameResult from './GameResult';

// GameResult is responsible for render the game result
describe('<GameResult />', () => {
  let props, mountedGameResult;
  const gameResult = () => {
    if(!mountedGameResult) {
      mountedGameResult = mount(
        <GameResult {...props} />
      );
    }
    return mountedGameResult;
  };

  beforeEach(() => {
    props = {
      onNewGameClick: jest.fn(),
      onNewRoundClick: jest.fn(),
      players: ['Player 1', 'Player 2'],
      result: {status: 'finished', winner: 'O'}
    };
    mountedGameResult = undefined;
  });

  it('render the GameResult', () => {
    const gameResultWrapper = shallow(<GameResult {...props} />);
    expect(gameResultWrapper).toMatchSnapshot();
  });

  it('div contains everything else that gets rendered', () => {
    const gameResultElement = gameResult().find('div');
    const wrappingDiv = gameResultElement.first();
    expect(wrappingDiv.hasClass('game-result')).toBeTruthy();
    expect(wrappingDiv.children()).toEqual(gameResult().children());
  });

  it('should have a p element with a message to the winner', () => {
    const messageElement = gameResult().find('p');
    expect(messageElement.length).toEqual(1);
    expect(messageElement.text()).toEqual('The winner is Player 2.');
  });

  it('should have a p element with a draw message', () => {
    props.result = {status: 'draw'};
    const messageElement = gameResult().find('p');
    expect(messageElement.length).toEqual(1);
    expect(messageElement.text()).toEqual('It`s a draw!');
  });

  describe('buttons', () => {
    it('should have a button wrapper', () => {
      const buttonWrapperElement = gameResult().find('div.buttons');
      expect(buttonWrapperElement.length).toEqual(1);
    });

    it('should have two buttons', () => {
      const buttonElements = gameResult().find('button');
      expect(buttonElements.length).toEqual(2);
    });

    it('simulate new round click', () => {
      props.onNewRoundClick = sinon.spy();
      const buttonWrapperElement = gameResult().find('div.buttons');
      const newRoundButton = buttonWrapperElement.childAt(0);

      newRoundButton.simulate('click');
      expect(props.onNewRoundClick.callCount).toEqual(1);
    });

    it('simulate new game click', () => {
      props.onNewGameClick = sinon.spy();
      const buttonWrapperElement = gameResult().find('div.buttons');
      const newGameButton = buttonWrapperElement.childAt(1);

      newGameButton.simulate('click');
      expect(props.onNewGameClick.callCount).toEqual(1);
    });
  });
});