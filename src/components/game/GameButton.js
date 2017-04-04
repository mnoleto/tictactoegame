import React, { Component, PropTypes } from 'react';
import '../../styles/game/GameButton.scss';

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
};

GameButton.propTypes = {
  label: PropTypes.string,
  index: PropTypes.number,
  onClickButton: PropTypes.func
}

export default GameButton;