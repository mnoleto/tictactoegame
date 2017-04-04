import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';

// App is responsible for render the game grid
// CONTRACTS
// 1. 

describe('App', () => {
  let props, mountedApp;
  const app = () => {
    if(!mountedApp) {
      mountedApp = mount(
        <App {...props} />
      );
    }
    return mountedApp;
  };

  beforeEach(() => {
    props = {};
    mountedApp = undefined;
  });

  it('render the App', () => {
    const appWrapper = shallow(<App />);
    expect(appWrapper).toMatchSnapshot();
  });

  it('render a div as root element', () => {
    const appElement = app().find('div');
    let wrappingDiv = appElement.first();
    expect(wrappingDiv.children()).toEqual(app().children());
  });
});