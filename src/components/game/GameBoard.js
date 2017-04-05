import React, { Component, PropTypes } from 'react';
import GameButton from './GameButton';
import '../../styles/game/GameBoard.scss';

class GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { board, onClickButton} = this.props;

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
}

GameBoard.propTypes = {
  board: PropTypes.array,
  onClickButton: PropTypes.func
}

export default GameBoard;