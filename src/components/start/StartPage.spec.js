import React from 'react';
import { mount, shallow } from 'enzyme';
import StartPage from './StartPage';

// StartPage is responsible for render the game first page
describe('StartPage', () => {
  let props, mountedStartPage;
  const startPage = () => {
    if(!mountedStartPage) {
      mountedStartPage = mount(
        <StartPage {...props} />
      );
    }
    return mountedStartPage;
  };

  beforeEach(() => {
    props = {};
    mountedStartPage = undefined;
  });

  it('render a StartPage', () => {
    let startPageWrapper = shallow(
      <StartPage />
    );
    expect(startPageWrapper).toMatchSnapshot();
  });

  it('always render a div as container for start page', () => {
    let startPageElement = startPage().find('div');
    let wrappingDiv = startPageElement.first();
    expect(wrappingDiv.children()).toEqual(startPage().children());
  });

  it('always render the root element with "start-page" as class', () => {
    let startPageElement = startPage().find('div');
    let wrappingDiv = startPageElement.first();
    expect(wrappingDiv.hasClass('start-page')).toBeTruthy();
  });

  it('always render the welcome message', () => {
    let startPageElement = startPage().find('div');
    let welcomeMessageElement = startPageElement.find('.welcome-message');
    expect(welcomeMessageElement.length).toEqual(1);
  });

  it('always render a link', () => {
    let startPageElement = startPage().find('div');
    let linkElement = startPageElement.find('a.play-button');
    expect(linkElement.length).toEqual(1);
  });
});