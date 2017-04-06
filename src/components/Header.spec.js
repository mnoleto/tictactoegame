import React from 'react';
import { mount, shallow } from 'enzyme';
import Header from './Header';

// Header is responsible for render the game title
describe('<Header />', () => {
  let props, mountedHeader;
  const header = () => {
    if(!mountedHeader) {
      mountedHeader = mount(
        <Header {...props} />
      );
    }
    return mountedHeader;
  };

  beforeEach(() => {
    props = {};
    mountedHeader = undefined;
  });

  it('always render the Header', () => {
    const headerWrapper = shallow(
      <Header />
    );
    expect(headerWrapper).toMatchSnapshot();
  });

  it('header contains everything else that gets rendered', () => {
    const headerElement = header().find('header');
    const wrappingHeader = headerElement.first();
    expect(wrappingHeader.children()).toEqual(header().children());
  });

  it('render a "a" element inside the header', () => {
    const aElement = header().find('a');
    expect(aElement.length).toEqual(1);
  });

  it('displays "Tic Tac Toe" text as a content', () => {
    expect(header().find('a').text()).toEqual('Tic Tac Toe');
  });

  it('header renders with default class', () => {
    const headerElement = header().find('header');
    expect(headerElement.hasClass('app-header')).toBeTruthy();
  });

  it('h1 renders with default class', () => {
    const headerElement = header().find('header');
    const aElement = headerElement.find('a');
    expect(aElement.hasClass('app-title')).toBeTruthy();
  });
});
