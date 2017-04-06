import React, { Component, PropTypes } from 'react';
import '../../styles/game/PlayerInput.scss';

/*
 * Class responsible for render the PlayerInput
 */
class PlayerInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      class: '',
      disabled: false
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.isInputDisabled = this.isInputDisabled.bind(this);
    this.setClass = this.setClass.bind(this);
  }

  componentDidUpdate(prevProps) {
    // test if the turn prop was changed
    if(this.props.turn !== '' && prevProps.turn !== this.props.turn) {
      this.setClass(); // update the class state
    }
    // check if the result.status prop was changed
    if(this.props.result.status && prevProps.result.status !== this.props.result.status) {
      this.isInputDisabled(); // update the disabled state
    }
  }

  /*
   * Function to handle all the input change and call the onInputChange method to send the value to the parent component
   */
  handleInputChange(event) {
    const { onInputChange, player } = this.props;
    onInputChange(player, event.target.value);
  }

  /*
   * Function to update the disabled state when the result.status changes
   */
  isInputDisabled() {
    const { result } = this.props;
    if(result.status && (result.status === 'running' || result.status === 'finished')) {
      this.setState({disabled: true});
    } else {
      this.setState({disabled: false});
    }
  }

  /*
   * Function to update the class state when the turn prop changes
   */
  setClass() {
    const { label, turn } = this.props;
    if(label === 'O') {
      this.setState({class: turn === 'O' ? 'active': (turn === 'X' ? 'inactive' : '')});
    } else {
      this.setState({class: turn === 'X' ? 'active': (turn === 'O' ? 'inactive' : '')});
    }
  }

  render() {
    const { label, player, value } = this.props;

    return (
      <div className={`player-input ${this.state.class}`}>
        <label>{label}</label>
        <input
          type="text"
          disabled={this.state.disabled}
          name={player}
          placeholder="Player name"
          value={value || ''}
          onChange={this.handleInputChange} />
      </div>
    );
  }
}

PlayerInput.propTypes = {
  label: PropTypes.string,
  onInputChange: PropTypes.func,
  player: PropTypes.string,
  result: PropTypes.object,
  turn: PropTypes.string,
  value: PropTypes.string
};

export default PlayerInput;