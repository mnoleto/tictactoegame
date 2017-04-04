import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PlayersForm from '../components/game/PlayersForm';
import GameBoard from '../components/game/GameBoard';
import GameResult from '../components/game/GameResult';
import Leaderboard from '../components/game/Leaderboard';
import GameCreators from '../actions/game';
import PlayersCreators from '../actions/players';

export class GamePage extends Component {
  constructor(props) {
    super(props);
    this.renderContent = this.renderContent.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.game.players !== this.props.game.players || prevProps.game.result.status !== this.props.game.result.status) {
      const { fetchPlayers } = this.props.playersActions;
      fetchPlayers();
    }
  }

  renderContent() {
    const { newGame, newRound, sendPlayersName, registerMove } = this.props.gameActions;
    const { board, players, result, turn } = this.props.game;

    if(result.status === 'finished' || result.status === 'draw') {
      return (
        <GameResult
          onNewGameClick={newGame}
          onNewRoundClick={newRound}
          players={players}
          result={result} />
      );
    } else {
      return (
        <div className="game-running">
          <PlayersForm
            onStartGame={sendPlayersName}
            result={result}
            turn={turn} />
          
          {(players && players.length === 2) &&
          <GameBoard
            board={board}
            turn={turn}
            onClickButton={registerMove} />
          }
        </div>
      );
    }
  }

  render() {
    const { allPlayers } = this.props;

    return (
      <div className="game-page">
        {this.renderContent()}

        {(allPlayers && allPlayers.length > 0) &&
          <Leaderboard
            allPlayers={allPlayers} />
        }
      </div>
    );
  }
};

GamePage.propTypes = {
  allPlayers: PropTypes.array,
  game: PropTypes.object,
  gameActions: PropTypes.object,
  playersActions: PropTypes.object
};

function mapStateToProps(state) {
  return {
    allPlayers: state.allPlayers.data,
    game: state.game
  };
}

function mapDispatchToProps(dispatch) {
  return {
    gameActions: bindActionCreators(GameCreators, dispatch), //Turns an object whose values are action creators, into an object with the same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly
    playersActions: bindActionCreators(PlayersCreators, dispatch) 
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GamePage);
