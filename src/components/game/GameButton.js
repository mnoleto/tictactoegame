import React, { Component, PropTypes } from 'react';
import '../../styles/game/GameButton.scss';

/*
 * Class responsible for render the GameButton
 */
class GameButton extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  /*
   * Function to handle the button click
   * - should send the button index for the parent component
   */
  handleClick() {
    const { index, onClickButton } = this.props;
    onClickButton(index);
  }

  render() {
    const { label } = this.props;

    // Should not render E for empty buttons, only X ou O
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
};

export default GameButton;