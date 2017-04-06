import React from 'react';
import ReactDOM from'react-dom';
import { mount, shallow } from 'enzyme';
import App from './App';

// App is responsible for render the game
describe('<App />', () => {
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

  it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<App/>, div);
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

  it('render the Header', () => {
    const headerElement = app().find('header.app-header');
    expect(headerElement.length).toEqual(1);
  });

  it('renders children when passed in', () => {
    const appWrapper = shallow(
      <App>
        <div className="unique" />
      </App>
    );
    expect(appWrapper.contains(<div className="unique" />)).toBeTruthy();
  });
});