import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import GameButton from './GameButton';

// GameButton is responsible for render the game grid buttons
describe('<GameButton />', () => {
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
    props = {
      index: 0,
      label: 'E',
      onClickButton: jest.fn()
    };
    mountedGameButton = undefined;
  });

  it('render the GameButton', () => {
    const gameButtonWrapper = shallow(<GameButton {...props} />);
    expect(gameButtonWrapper).toMatchSnapshot();
  });

  it('render a button as root element', () => {
    const gameButtonElement = gameButton().find('button');
    const wrappingDiv = gameButtonElement.first();
    expect(wrappingDiv.children()).toEqual(gameButton().children());
  });

  it('should have a class game-button', () => {
    const gameButtonElement = gameButton().find('button');
    expect(gameButtonElement.hasClass('game-button')).toBeTruthy();
  });

  it('should have an empty content if gets a prop label with "E" value', () => {
    const gameButtonElement = gameButton().find('button');
    expect(gameButtonElement.text()).toEqual('');
  });

  it('should have display content if gets a prop label different from "E" value', () => {
    props.label = 'X';
    const gameButtonElement = gameButton().find('button');
    expect(gameButtonElement.text()).toEqual('X');
  });

  it('simulate click', () => {
    props.onClickButton = sinon.spy();
    const gameButtonElement = gameButton().find('button');

    gameButtonElement.simulate('click');
    expect(props.onClickButton.callCount).toEqual(1);
  });
});
