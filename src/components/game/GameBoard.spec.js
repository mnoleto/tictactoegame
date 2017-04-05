import React from 'react';
import { mount, shallow } from 'enzyme';
import GameBoard from './GameBoard';

// GameBoard is responsible for render the game grid
describe('GameBoard', () => {
  let props, mountedGameBoard;
  const gameBoard = () => {
    if(!mountedGameBoard) {
      mountedGameBoard = mount(
        <GameBoard {...props} />
      );
    }
    return mountedGameBoard;
  };

  beforeEach(() => {
    props = {
      board: ['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', 'E', ],
      onClickButton: jest.fn()
    };
    mountedGameBoard = undefined;
  });

  it('should render the GameBoard', () => {
    const gameBoardWrapper = shallow(<GameBoard {...props} />);
    expect(gameBoardWrapper).toMatchSnapshot();
  });

  it('should render a div as root element', () => {
    const gameBoardElement = gameBoard().find('div');
    let wrappingDiv = gameBoardElement.first();
    expect(wrappingDiv.children()).toEqual(gameBoard().children());
  });

  it('should render 9 buttons', () => {
    const buttonElements = gameBoard().find('button');
    expect(buttonElements.length).toEqual(9);
  })
});