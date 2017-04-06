import React, { Component, PropTypes } from 'react';
import GameButton from './GameButton';
import '../../styles/game/GameBoard.scss';

// GameBoard is responsible for render the game board
const GameBoard = ({ board, onClickButton}) => {
  let buttons;
  if(board) {
    buttons = board.map((value, index) => {
      return(
        <GameButton
          key={'button_' + index}
          index={index}
          label={value}
          onClickButton={onClickButton} />
      );
    });
  }

  return (
    <div className="game-board">
      {buttons}
    </div>
  );
}

GameBoard.propTypes = {
  board: PropTypes.array.isRequired,
  onClickButton: PropTypes.func.isRequired
}

export default GameBoard;