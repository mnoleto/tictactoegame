import React, { Component, PropTypes } from 'react';
import PlayerInput from './PlayerInput';
import '../../styles/game/PlayersForm.scss';

// PlayersForm is responsible for render the players form
class PlayersForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      playerX: '',
      playerO: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderFormFooter = this.renderFormFooter.bind(this);
    this.renderFormHeader = this.renderFormHeader.bind(this);
    this.sendData = this.sendData.bind(this);
  }

  componentWillReceiveProps() {
    if(this.props.players.length > 0 && this.props.players[0] !== this.state.playerX  && this.props.players[1] !== this.state.playerO ) {
      this.setState({
        playerX: this.props.players[0],
        playerO: this.props.players[1]
      });
    }
  }

  handleInputChange(name, value) {
    this.setState({[name]: value});
  }

  sendData() {
    const { onStartGame } = this.props;
    let playerX = this.state.playerX,
      playerO = this.state.playerO;

    onStartGame(playerX, playerO);
  }

  renderFormFooter() {
    const { result, turn } = this.props;
    if(result.status && (result.status && result.status === 'running')) {
      return (
        <div className="turn">It`s <strong>{turn}</strong> turn.</div>
      );
    } else if(!result.status || (result.status && result.status !== 'running')) {
      return (
        <button type="button" className="start-game-button" onClick={this.sendData}>start game</button>
      );
    }
  }

  renderFormHeader() {
    const { result } = this.props;
    if(!result.status || (result.status && result.status !== 'running')) {
      return (
        <legend>Please, inform the players name below:</legend>
      );
    }
    return '';
  }

  render() {
    const { result, turn } = this.props;
    
    return (
      <form className="players-form">
        {this.renderFormHeader()}

        <PlayerInput
          label="X"
          onInputChange={this.handleInputChange}
          player="playerX"
          result={result}
          turn={turn}
          value={this.state.playerX || ''} />

        <PlayerInput
          label="O"
          onInputChange={this.handleInputChange}
          player="playerO"
          result={result}
          turn={turn}
          value={this.state.playerO || ''} />

        {this.renderFormFooter()}
      </form>
    );
  }
}

PlayersForm.propTypes = {
  onStartGame: PropTypes.func.isRequired,
  players: PropTypes.array,
  result: PropTypes.object.isRequired,
  turn: PropTypes.string
};

export default PlayersForm;