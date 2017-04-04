import React, { PropTypes } from 'react';
import Header from './Header';
import '../styles/App.scss';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <Header />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element
};

export default App;
