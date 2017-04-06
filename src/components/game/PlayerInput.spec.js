import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import PlayerInput from './PlayerInput';

// PlayerInput is responsible for render the player input field
describe('<PlayerInput />', () => {
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
    const playerInputWrapper = shallow(<PlayerInput {...props} />);
    expect(playerInputWrapper).toMatchSnapshot();
  });

  it('div contains everything else that gets rendered', () => {
    const playerInputElement = playerInput().find('div');
    const wrapping = playerInputElement.first();
    expect(wrapping.children()).toEqual(playerInput().children());
  });

  it('should render a label', () => {
    const playerInputElement = playerInput().find('label');
    expect(playerInputElement.length).toEqual(1);
  });

  it('should displays the label prop as label text', () => {
    const playerInputElement = playerInput().find('label');
    expect(playerInputElement.text()).toEqual(props.label);
  });

  describe('css classes', () => {
    it('should render a default class player-input', () => {
      const playerInputElement = playerInput().find('div');
      const wrapping = playerInputElement.first();
      expect(wrapping.hasClass('player-input')).toBeTruthy();
    });

    it('should render an active class when its his turn', () => {
      const inputRenderer = playerInput();
      const wrapping = playerInput().find('div').first();
      inputRenderer.setProps({turn: 'X'});
      expect(inputRenderer.state().class).toEqual('active');
      expect(wrapping.hasClass('active')).toBeTruthy();
      expect(wrapping.hasClass('inactive')).toBeFalsy();
    });

    it('should render an active class when its not his turn', () => {
      const inputRenderer = playerInput();
      const wrapping = playerInput().find('div').first();
      inputRenderer.setProps({turn: 'O'});
      expect(inputRenderer.state().class).toEqual('inactive');
      expect(wrapping.hasClass('inactive')).toBeTruthy();
      expect(wrapping.hasClass('active')).toBeFalsy();
    });
  });

  describe('input type=text', () => {
    it('should render a input type=text', () => {
      const playerInputElement = playerInput().find('input');
      expect(playerInputElement.length).toEqual(1);
    });

    it('should change its value when change props', () => {
      const inputRenderer = playerInput();
      const inputElement = playerInput().find('input').first();

      inputRenderer.setProps({value: 'Player 1'});
      expect(inputElement.props().value).toEqual('Player 1');

      inputRenderer.setProps({value: 'Player 2'});
      expect(inputElement.props().value).toEqual('Player 2');
    });

    it('simulate change event', () => {
      props.onInputChange = sinon.spy();
      const inputElement = playerInput().find('input').first();

      inputElement.simulate('change');
      expect(props.onInputChange.callCount).toEqual(1);
    });

    it('should be disabled when the status is running', () => {
      const inputRenderer = playerInput();
      const inputElement = playerInput().find('input').first();
      inputRenderer.setProps({result: {status: 'running'}});
      expect(inputRenderer.state().disabled).toBeTruthy();
      expect(inputElement.props().disabled).toBeTruthy();
    });

    it('should be enabled when the status is not running', () => {
      const inputRenderer = playerInput();
      const inputElement = playerInput().find('input').first();
      inputRenderer.setProps({result: {status: 'waiting'}});
      expect(inputRenderer.state().disabled).toBeFalsy();
      expect(inputElement.props().disabled).toBeFalsy();
    });
  });

  describe('Test methods', () => {
    let playerInputRenderer;
    beforeEach(() => {
      props.onInputChange = sinon.spy();
      playerInputRenderer = shallow(<PlayerInput {...props} />);
    });

    describe('componentDidUpdate', () => {
      it('should change the class state when change turn', () => {
        playerInputRenderer.setProps({turn: 'O'});
        playerInputRenderer.instance().componentDidUpdate({turn: 'X', result: {status: 'running'}});
        expect(playerInputRenderer.state().class).toEqual('inactive');
      });

      it('should change the disabled state when change turn', () => {
        playerInputRenderer.setProps({result: {status: 'running'}});
        playerInputRenderer.instance().componentDidUpdate({turn: 'X', result: {status: 'waiting'}});
        expect(playerInputRenderer.state().disabled).toBeTruthy();
      });
    });

    describe('handleInputChange', () => {
      it('should call onInputChange', () => {
        playerInputRenderer.instance().handleInputChange({target: {value: 'Test'}});
        expect(props.onInputChange.callCount).toEqual(1);
      });
    });

    describe('isInputDisabled', () => {
      it('should change the disabled state when change turn', () => {
        playerInputRenderer.setProps({result: {status: 'running'}});
        playerInputRenderer.instance().isInputDisabled();
        expect(playerInputRenderer.state().disabled).toBeTruthy();
      });
    });

    describe('setClass', () => {
      it('should change the class state when change turn', () => {
        playerInputRenderer.setProps({turn: 'O'});
        playerInputRenderer.instance().setClass();
        expect(playerInputRenderer.state().class).toEqual('inactive');
      });
    });
  });
});