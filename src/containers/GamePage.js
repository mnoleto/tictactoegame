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
    this.renderLeaderboard = this.renderLeaderboard.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.game.result && this.props.game.result && nextProps.game.result.status !== this.props.game.result.status) {
      const { fetchPlayers } = this.props.playersActions;
      fetchPlayers();
    }
  }

  componentWillUnmount() {
    const { resetGame } = this.props.gameActions;
    const { fetchPlayers } = this.props.playersActions;
    resetGame();
    fetchPlayers();
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
            players={players}
            result={result}
            turn={turn} />
          
          {(result.status === 'running') &&
          <GameBoard
            board={board}
            turn={turn}
            onClickButton={registerMove} />
          }
        </div>
      );
    }
  }

  renderLeaderboard() {
    const { allPlayers } = this.props;

    if(allPlayers && allPlayers.length > 0) {
      return (
        <Leaderboard
          allPlayers={allPlayers} />
      );
    }
  }

  render() {
    return (
      <div className="game-page">
        {this.renderContent()}
        {this.renderLeaderboard()}
      </div>
    );
  }
}

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
