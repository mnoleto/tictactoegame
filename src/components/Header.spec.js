import React from 'react';
import { mount, shallow } from 'enzyme';
import Header from './Header';

// Header is responsible for render the game title
// CONTRACTS
// 1. Should always render the component
// 2. Should render a header element as root element
// 3. Should header a header with the default class
// 4. Should render a h1 element inside the header
// 5. Should render the h1 if the default class
// 6. Should have the content Tic Tac Toe Game inside the h1 element

describe('Header', () => {
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

  it('render a h1 element inside the header', () => {
    const headerElement = header().find('header');
    const hElement = headerElement.find('h1');
    expect(hElement.length).toEqual(1);
  });

  it('displays "Tic Tac Toe" text as h1 content', () => {
    expect(header().find('h1').text()).toEqual('Tic Tac Toe');
  });

  it('header renders with default class', () => {
    const headerElement = header().find('header');
    expect(headerElement.hasClass('app-header')).toBeTruthy();
  });

  it('h1 renders with default class', () => {
    const headerElement = header().find('header');
    const hElement = headerElement.find('h1');
    expect(hElement.hasClass('app-title')).toBeTruthy();
  });
});
