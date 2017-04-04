import React, { Component, PropTypes } from 'react';
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
        let scoreA = (parseInt(a.wins)*3) + parseInt(a.draws),
          scoreB = (parseInt(b.wins)*3) + parseInt(b.draws);
        
        return scoreB - scoreA;
      });

      playersItens = orderedPlayers.map((value, index) => {
        return (
          <tr key={'leaderboard_' + index}>
            <td className="position">{index + 1}</td>
            <td className="name">{value.name}</td>
            <td className="wins">{value.wins}</td>
            <td className="defeats">{value.defeats}</td>
            <td className="draws">{value.draws}</td>
          </tr>
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
};

Leaderboard.propTypes = {
  allPlayers: PropTypes.array
};

export default Leaderboard;