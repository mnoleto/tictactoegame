import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import PlayerInput from './PlayerInput';

// PlayerInput is responsible for render the game grid
describe('PlayerInput', () => {
  let props, mountedPlayerInput;
  const playerInput = () => {
    if(!mountedPlayerInput) {
      mountedPlayerInput = mount(
        <PlayerInput {...props} />
      );
    }
    return mountedPlayerInput;
  };

  beforeEach(() => {
    props = {
      label: 'X',
      onInputChange: jest.fn(),
      player: 'playerX',
      result: {status: 'waiting'},
      turn: '',
      value: ''
    };
    mountedPlayerInput = undefined;
  });

  it('should render the PlayerInput', () => {
    let playerInputWrapper = shallow(<PlayerInput {...props} />);
    expect(playerInputWrapper).toMatchSnapshot();
  });

  it('div contains everything else that gets rendered', () => {
    let playerInputElement = playerInput().find('div');
    let wrapping = playerInputElement.first();
    expect(wrapping.children()).toEqual(playerInput().children());
  });

  it('should render a label', () => {
    let playerInputElement = playerInput().find('label');
    expect(playerInputElement.length).toEqual(1);
  });

  it('should displays the label prop as label text', () => {
    let playerInputElement = playerInput().find('label');
    expect(playerInputElement.text()).toEqual(props.label);
  });

  describe('css classes', () => {
    it('should render a default class player-input', () => {
      let playerInputElement = playerInput().find('div');
      let wrapping = playerInputElement.first();
      expect(wrapping.hasClass('player-input')).toBeTruthy();
    });

    it('should render an active class when its his turn', () => {
      let inputRenderer = playerInput();
      let wrapping = playerInput().find('div').first();
      inputRenderer.setProps({turn: 'X'});
      expect(inputRenderer.state().class).toEqual('active');
      expect(wrapping.hasClass('active')).toBeTruthy();
      expect(wrapping.hasClass('inactive')).toBeFalsy();
    });

    it('should render an active class when its not his turn', () => {
      let inputRenderer = playerInput();
      let wrapping = playerInput().find('div').first();
      inputRenderer.setProps({turn: 'O'});
      expect(inputRenderer.state().class).toEqual('inactive');
      expect(wrapping.hasClass('inactive')).toBeTruthy();
      expect(wrapping.hasClass('active')).toBeFalsy();
    });
  });

  describe('input type=text', () => {
    it('should render a input type=text', () => {
      let playerInputElement = playerInput().find('input');
      expect(playerInputElement.length).toEqual(1);
    });

    it('should change its value when change props', () => {
      let inputRenderer = playerInput();
      let inputElement = playerInput().find('input').first();

      inputRenderer.setProps({value: 'Player 1'});
      expect(inputElement.props().value).toEqual('Player 1');

      inputRenderer.setProps({value: 'Player 2'});
      expect(inputElement.props().value).toEqual('Player 2');
    });

    it('simulate change event', () => {
      props.onInputChange = sinon.spy();
      let inputElement = playerInput().find('input').first();

      inputElement.simulate('change');
      expect(props.onInputChange.callCount).toEqual(1);
    });

    it('should be disabled when the status is running', () => {
      let inputRenderer = playerInput();
      let inputElement = playerInput().find('input').first();
      inputRenderer.setProps({result: {status: 'running'}});
      expect(inputRenderer.state().disabled).toBeTruthy();
      expect(inputElement.props().disabled).toBeTruthy();
    });

    it('should be enabled when the status is not running', () => {
      let inputRenderer = playerInput();
      let inputElement = playerInput().find('input').first();
      inputRenderer.setProps({result: {status: 'waiting'}});
      expect(inputRenderer.state().disabled).toBeFalsy();
      expect(inputElement.props().disabled).toBeFalsy();
    });
  });
});