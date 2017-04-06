import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import PlayersForm from './PlayersForm';

// PlayersForm is responsible for render the players form
describe('<PlayersForm />', () => {
  let props, mountedPlayersForm;
  const playersForm = () => {
    if(!mountedPlayersForm) {
      mountedPlayersForm = mount(
        <PlayersForm {...props} />
      );
    }
    return mountedPlayersForm;
  };

  beforeEach(() => {
    props = {
      onStartGame: jest.fn(),
      players: [],
      result: {status: 'waiting'},
      turn: ''
    };
    mountedPlayersForm = undefined;
  });

  it('should render the PlayersForm', () => {
    const playersFormWrapper = shallow(<PlayersForm {...props} />);
    expect(playersFormWrapper).toMatchSnapshot();
  });

  it('form contains everything else that gets rendered', () => {
    const playersFormElement = playersForm().find('form');
    const wrapping = playersFormElement.first();
    expect(wrapping.hasClass('players-form')).toBeTruthy();
    expect(wrapping.children()).toEqual(playersForm().children());
  });

  describe('legend', () => {
    it('should render a legend inside the form if the result.status is not running', () => {
      const playersFormRenderer = playersForm();
      playersFormRenderer.setProps({result: {status: 'waiting'}});
      const legendElement = playersForm().find('legend');
      expect(legendElement.length).toEqual(1);
    });

    it('should not render a legend inside the form if the result.status is running', () => {
      const playersFormRenderer = playersForm();
      playersFormRenderer.setProps({result: {status: 'running'}});
      const legendElement = playersForm().find('legend');
      expect(legendElement.length).toEqual(0);
    });
  });
  
  describe('div.player-input', () => {
    it('should render two div.player-input', () => {
      const inputElements = playersForm().find('div.player-input');
      expect(inputElements.length).toEqual(2);
    });
  });

  describe('start game button', () => {
    it('should render the button.start-game-button inside the form if the result.status is not running', () => {
      const playersFormRenderer = playersForm();
      playersFormRenderer.setProps({result: {status: 'waiting'}});
      const buttonElement = playersForm().find('button');
      expect(buttonElement.length).toEqual(1);
    });

    it('should not render the button.start-game-button inside the form if the result.status is running', () => {
      const playersFormRenderer = playersForm();
      playersFormRenderer.setProps({result: {status: 'running'}});
      const buttonElement = playersForm().find('button');
      expect(buttonElement.length).toEqual(0);
    });

    it('simulate click event', () => {
      props.onStartGame = sinon.spy();
      const buttonElement = playersForm().find('button');

      buttonElement.simulate('click');
      expect(props.onStartGame.callCount).toEqual(1);
    });
  });

  describe('Test methods', () => {
    let playersFormRenderer;
    beforeEach(() => {
      props.onStartGame = sinon.spy();
      playersFormRenderer = shallow(<PlayersForm {...props} />);
    });

    describe('componentWillReceiveProps', () => {
      it('should change the players state', () => {
        playersFormRenderer.setProps({players: ['Player 1', 'Player 2']});
        playersFormRenderer.instance().componentWillReceiveProps();
        expect(playersFormRenderer.state().playerX).toEqual('Player 1');
        expect(playersFormRenderer.state().playerO).toEqual('Player 2');
      });
    });

    describe('handleInputChange', () => {
      it('should change the state', () => {
        playersFormRenderer.instance().handleInputChange('playerX', 'John');
        expect(playersFormRenderer.state().playerX).toEqual('John');

        playersFormRenderer.instance().handleInputChange('playerX', 'Mark');
        expect(playersFormRenderer.state().playerX).toEqual('Mark');

        playersFormRenderer.instance().handleInputChange('playerO', 'Player 3');
        expect(playersFormRenderer.state().playerO).toEqual('Player 3');
      });
    });

    describe('sendData', () => {
      it('should call onStartGame', () => {
        playersFormRenderer.instance().sendData();
        expect(props.onStartGame.callCount).toEqual(1);
      });
    });
  });
});