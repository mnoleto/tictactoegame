import React from 'react';
import { Link } from 'react-router';
import WelcomeMessage from './WelcomeMessage';
import '../../styles/start/StartPage.scss';

const StartPage = () => {

  return (
    <div className="start-page">
      <WelcomeMessage />
      <Link to="/game" className="play-button">Play</Link>
    </div>
  );

};

export default StartPage;