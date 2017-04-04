import React from 'react';
import { mount, shallow } from 'enzyme';
import { GamePage } from './GamePage';

// GamePage is responsible for render the game grid
// CONTRACTS
// 1. Should render the GamePage
// 2. Should render a div as root element

describe('GamePage', () => {
  let props, mountedGamePage;
  const gamePage = () => {
    if(!mountedGamePage) {
      mountedGamePage = mount(
        <GamePage {...props} />
      );
    }
    return mountedGamePage;
  };

  beforeEach(() => {
    props = {
      actions: {
        sendPlayersNameRequest: () => {}
      }
    };
    mountedGamePage = undefined;
  });

  it('render the GamePage dumb component', () => {
    // const gamePageWrapper = shallow(<GamePage {...props} />);
    // expect(gamePageWrapper).toMatchSnapshot();
    // expect(gamePageWrapper.length).toEqual(1);
  });

  // it('render a div as root element', () => {
  //   let gamePageElement = gamePage().find('div');
  //   let wrappingDiv = gamePageElement.first();
  //   expect(wrappingDiv.children()).toEqual(gamePage().children());
  // });
});