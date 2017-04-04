import React from 'react';
import { mount, shallow } from 'enzyme';
import GameButton from './GameButton';

// GameButton is responsible for render the game grid
// CONTRACTS
// 1. Should render the GameButton

describe('GameButton', () => {
  let props, mountedGameButton;
  const gameButton = () => {
    if(!mountedGameButton) {
      mountedGameButton = mount(
        <GameButton {...props} />
      );
    }
    return mountedGameButton;
  };

  beforeEach(() => {
    props = {};
    mountedGameButton = undefined;
  });

  it('render the GameButton', () => {
    const gameButtonWrapper = shallow(<GameButton />);
    expect(gameButtonWrapper).toMatchSnapshot();
  });

  it('render a button as root element', () => {
    let gameButtonElement = gameButton().find('button');
    let wrappingDiv = gameButtonElement.first();
    expect(wrappingDiv.children()).toEqual(gameButton().children());
  });
});