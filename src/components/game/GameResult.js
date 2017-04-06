import React, { Component, PropTypes } from 'react';
import '../../styles/game/GameResult.scss';

// GameResult is responsible for render the game result
class GameResult extends Component {
  constructor(props) {
    super(props);
    this.renderMessage = this.renderMessage.bind(this);
  }

  renderMessage() {
    const { players, result } = this.props;
    if(result.status === 'draw') {
      const draw = ['It`s a draw!'];
      return draw.map((value, index) => <span key={'message_' + index}>{value}</span>);
    } else {
      const winnerName = (!result.draw && result.winner === 'X') ? players[0] : players[1];
      const winner = ['The winner is ', <strong>{winnerName}</strong>, '.'];
      return winner.map((value, index) => <span key={'message_' + index}>{value}</span>);
    }
  }

  render() {
    const { onNewGameClick, onNewRoundClick } = this.props;
    
    return (
      <div className="game-result">
        <p>{this.renderMessage()}</p>
        <div className="buttons">
          <button type="button" className="new-round-button" onClick={onNewRoundClick}>New Round</button>
          <button type="button" className="new-game-button" onClick={onNewGameClick}>New Game</button>
        </div>
      </div>
    );
  }
}

GameResult.propTypes = {
  onNewGameClick: PropTypes.func.isRequired,
  onNewRoundClick: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  result: PropTypes.object.isRequired
}

export default GameResult;