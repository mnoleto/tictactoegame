import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import PlayersForm from './PlayersForm';

// PlayersForm is responsible for render the game grid
describe('PlayersForm', () => {
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
    let playersFormWrapper = shallow(<PlayersForm {...props} />);
    expect(playersFormWrapper).toMatchSnapshot();
  });

  it('form contains everything else that gets rendered', () => {
    let playersFormElement = playersForm().find('form');
    let wrapping = playersFormElement.first();
    expect(wrapping.children()).toEqual(playersForm().children());
  });

  describe('legend', () => {
    it('should render a legend inside the form if the result.status is not running', () => {
      let playersFormRenderer = playersForm();
      playersFormRenderer.setProps({result: {status: 'waiting'}});
      let legendElement = playersForm().find('legend');
      expect(legendElement.length).toEqual(1);
    });

    it('should not render a legend inside the form if the result.status is running', () => {
      let playersFormRenderer = playersForm();
      playersFormRenderer.setProps({result: {status: 'running'}});
      let legendElement = playersForm().find('legend');
      expect(legendElement.length).toEqual(0);
    });
  });
  
  describe('div.player-input', () => {
    it('should render two div.player-input', () => {
      let inputElements = playersForm().find('div.player-input');
      expect(inputElements.length).toEqual(2);
    });
  });

  describe('start game button', () => {
    it('should render the button.start-game-button inside the form if the result.status is not running', () => {
      let playersFormRenderer = playersForm();
      playersFormRenderer.setProps({result: {status: 'waiting'}});
      let buttonElement = playersForm().find('button');
      expect(buttonElement.length).toEqual(1);
    });

    it('should not render the button.start-game-button inside the form if the result.status is running', () => {
      let playersFormRenderer = playersForm();
      playersFormRenderer.setProps({result: {status: 'running'}});
      let buttonElement = playersForm().find('button');
      expect(buttonElement.length).toEqual(0);
    });

    it('simulate click event', () => {
      props.onStartGame = sinon.spy();
      let buttonElement = playersForm().find('button');

      buttonElement.simulate('click');
      expect(props.onStartGame.callCount).toEqual(1);
    });
  });
});