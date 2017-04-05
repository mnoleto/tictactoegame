import React, { Component, PropTypes } from 'react';
import LeaderboardTr from './LeaderboardTr';
import '../../styles/game/Leaderboard.scss';

class Leaderboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { allPlayers } = this.props;

    let playersItens;
    if(allPlayers && allPlayers.length > 0) {
      const orderedPlayers = allPlayers.sort((a, b) => {
        let scoreA = (parseInt(a.wins)*3) + parseInt(a.draws) - parseInt(a.defeats),
          scoreB = (parseInt(b.wins)*3) + parseInt(b.draws) - parseInt(b.defeats);
        
        return scoreB - scoreA;
      });

      playersItens = orderedPlayers.map((value, index) => {
        return (
          <LeaderboardTr
            key={'leaderboard_' + index}
            position={index + 1}
            name={value.name}
            wins={value.wins}
            defeats={value.defeats}
            draws={value.draws} />
        );
      });
    }

    return (
      <div className="leaderboard">
        <h4 className="title">Leaderboard</h4>
        <table cellPadding="0" cellSpacing="0">
          <thead>
            <tr className="heading">
              <th colSpan="2" className="name">Name</th>
              <th className="wins">Wins</th>
              <th className="defeats">Defeats</th>
              <th className="draws">Draws</th>
            </tr>
          </thead>
          <tbody>
            {playersItens}
          </tbody>
        </table>
      </div>
    );
  }
}

Leaderboard.propTypes = {
  allPlayers: PropTypes.array
};

export default Leaderboard;