import React, { Component, PropTypes } from 'react';
import '../../styles/game/GameButton.scss';

// GameButton is responsible for render the game grid buttons
class GameButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { index, onClickButton } = this.props;
    onClickButton(index);
  }

  render() {
    const { label } = this.props;
    const buttonLabel = (label && label === 'E') ? '' : label;
    return (
      <button type="button" className="game-button" onClick={this.handleClick}>{buttonLabel}</button>
    );
  }
}

GameButton.propTypes = {
  index: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  onClickButton: PropTypes.func.isRequired
}

export default GameButton;