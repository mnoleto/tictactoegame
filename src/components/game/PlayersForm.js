import React, { Component, PropTypes } from 'react';
import PlayerInput from './PlayerInput';
import '../../styles/game/PlayersForm.scss';

/*
 * Class responsible for render the PlayersForm
 */
class PlayersForm extends Component {
  constructor(props) {
    super(props);

    // playerX and playerO state used to update the PlayerInput component
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
    // check if the players props changed before update the state
    if(this.props.players.length > 0 && this.props.players[0] !== this.state.playerX  && this.props.players[1] !== this.state.playerO ) {
      // update the playerX and playerO state 
      this.setState({
        playerX: this.props.players[0],
        playerO: this.props.players[1]
      });
    }
  }

  /*
   * Function to handle all the input changes and update the state
   * @param name [String]: name of the state to be updated
   * @param value [String]: value to update the state
   */
  handleInputChange(name, value) {
    this.setState({[name]: value});
  }

  /*
   * Function to send the players name to the parent component when the user hit the "start game button"
   */
  sendData() {
    const { onStartGame } = this.props;
    let playerX = this.state.playerX,
      playerO = this.state.playerO;

    onStartGame(playerX, playerO);
  }

  /*
   * Function to render the form footer
   * - Should render the player turn when the game is running ou the start game button when the game isn`t running
   */
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

  /*
   * Function to render the form header
   * - Should render legend text when the game isn`t running
   */
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