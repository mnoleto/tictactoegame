import React, { Component, PropTypes } from 'react';
import '../../styles/game/PlayersForm.scss';

class PlayersForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerX: '',
      playerO: ''
    };
    this.sendData = this.sendData.bind(this);
  }

  sendData() {
    const { onStartGame } = this.props;
    let playerX = this.refs.playerX.value,
      playerO = this.refs.playerO.value;

    if(playerX !== '' && playerO !== '') {
      onStartGame(playerX, playerO);
    }
  }

  render() {
    const { result, turn } = this.props;
    
    return (
      <form className="players-form">
        {(!result.status || (result.status && result.status !== 'running')) && 
        <legend>Please, inform the players name below:</legend>
        }

        <div className={"player-input" + (turn === 'X' ? ' active': (turn === 'O' ? ' inactive' : ''))}>
          <label>X</label>
          <input type="text" ref="playerX" disabled={(result.status && (result.status === 'running' || result.status === 'finished')) ? true : false} />
        </div>

        <div className={"player-input" + (turn === 'O' ? ' active': (turn === 'X' ? ' inactive' : ''))}>
          <label>O</label>
          <input type="text" ref="playerO" disabled={(result.status && (result.status === 'running' || result.status === 'finished')) ? true : false} />
        </div>

        {(!result.status || (result.status && result.status !== 'running')) && 
        <button type="button" className="start-game-button" onClick={this.sendData}>start game</button>
        }
      </form>
    );
  }
};

PlayersForm.propTypes = {
  onStartGame: PropTypes.func,
  result: PropTypes.object,
  turn: PropTypes.string
};

export default PlayersForm;