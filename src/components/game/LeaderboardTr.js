import React, { PropTypes } from 'react';

/*
 * Stateless component for render the LeaderboardTr
 */
const LeaderboardTr = ({ defeats, draws, name, position, wins }) => {
  return (
    <tr>
      <td className="position">{position}</td>
      <td className="name">{name}</td>
      <td className="wins">{wins}</td>
      <td className="defeats">{defeats}</td>
      <td className="draws">{draws}</td>
    </tr>
  );
};

LeaderboardTr.propTypes = {
  defeats: PropTypes.number.isRequired,
  draws: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.number.isRequired,
  wins: PropTypes.number.isRequired
};

export default LeaderboardTr;