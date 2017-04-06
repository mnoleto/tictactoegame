import React, { PropTypes } from 'react';
import Header from './Header';
import '../styles/App.scss';

/*
 * Stateless component responsible for render the App
 */
const App = ({children}) => {
  return (
    <div className="app">
      <Header />
      {children}
    </div>
  );
};

App.propTypes = {
  children: PropTypes.element
};

export default App;
