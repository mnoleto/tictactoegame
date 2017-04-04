import React from 'react';
import { mount, shallow } from 'enzyme';
import PlayersForm from './PlayersForm';

// PlayersForm is responsible for render the game grid
// CONTRACTS
// 1. 

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
      onStartGame: jest.fn()
    };
    mountedPlayersForm = undefined;
  });

  it('render the PlayersForm', () => {
    const playersFormWrapper = shallow(<PlayersForm />);
    expect(playersFormWrapper).toMatchSnapshot();
  });

  // it('render a div as root element', () => {
  //   const playersFormElement = playersForm().find('form');
  //   let wrappingDiv = playersFormElement.first();
  //   expect(wrappingDiv.children()).toEqual(playersForm().children());
  // });
});