import React from 'react';
import { mount, shallow } from 'enzyme';
import GameBoard from './GameBoard';

// GameBoard is responsible for render the game grid
// CONTRACTS
// 1. 

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
    props = {};
    mountedGameBoard = undefined;
  });

  it('render the GameBoard', () => {
    const gameBoardWrapper = shallow(<GameBoard />);
    expect(gameBoardWrapper).toMatchSnapshot();
  });

  it('render a div as root element', () => {
    const gameBoardElement = gameBoard().find('div');
    let wrappingDiv = gameBoardElement.first();
    expect(wrappingDiv.children()).toEqual(gameBoard().children());
  });
});