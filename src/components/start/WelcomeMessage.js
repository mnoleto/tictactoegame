import React from 'react';
import '../../styles/start/WelcomeMessage.scss';

// WelcomeMessage is responsible for render the game welcome message for the first page
const WelcomeMessage = () => {
  return (
    <div className="welcome-message">
      <p>Tic-tac-toe (also known as noughts and crosses or Xs and Os) is a paper-and-pencil game for two players, X and O, who take turns marking the spaces in a 3×3 grid. The player who succeeds in placing three of their marks in a horizontal, vertical, or diagonal row wins the game.</p>
    </div>
  );
};

export default WelcomeMessage;