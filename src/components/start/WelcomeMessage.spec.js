import React from 'react';
import { mount, shallow } from 'enzyme';
import WelcomeMessage from './WelcomeMessage';

// WelcomeMessage is responsible for render the game grid
// CONTRACTS
// 1. 

describe('WelcomeMessage', () => {
  let props, mountedWelcomeMessage;
  const welcomeMessage = () => {
    if(!mountedWelcomeMessage) {
      mountedWelcomeMessage = mount(
        <WelcomeMessage {...props} />
      );
    }
    return mountedWelcomeMessage;
  };

  beforeEach(() => {
    props = {};
    mountedWelcomeMessage = undefined;
  });

  it('render the WelcomeMessage', () => {
    const welcomeMessageWrapper = shallow(<WelcomeMessage />);
    expect(welcomeMessageWrapper).toMatchSnapshot();
  });

  it('render a div as root element', () => {
    const welcomeMessageElement = welcomeMessage().find('div');
    let wrappingDiv = welcomeMessageElement.first();
    expect(wrappingDiv.children()).toEqual(welcomeMessage().children());
  });

  it('render a "p" as root element', () => {
    const pElement = welcomeMessage().find('p');
    expect(pElement.length).toEqual(1);
  });
});