import React, { Component, PropTypes } from 'react';
import '../../styles/game/GameResult.scss';

class GameResult extends Component {
  render() {
    const { onNewGameClick, players, result } = this.props;
    
    let message;

    if(result.status === 'draw') {
      const draw = ['It`s a draw!'];
      message = draw.map((value, index) => <span key={'message_' + index}>{value}</span>);
    } else {
      const winnerName = (!result.draw && result.winner === 'X') ? players[0] : players[1];
      const winner = ['The winner is ', <strong>{winnerName}</strong>, '.'];
      message = winner.map((value, index) => <span key={'message_' + index}>{value}</span>);
    }
    return (
      <div className="game-result">
        <p>{message}</p>
        <button type="button" className="new-game-button" onClick={onNewGameClick}>New Game</button>
      </div>
    );
  }

};

GameResult.propTypes = {
  onNewGameClick: PropTypes.func,
  players: PropTypes.array,
  result: PropTypes.object
}

export default GameResult;