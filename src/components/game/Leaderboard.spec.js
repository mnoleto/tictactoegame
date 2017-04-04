import React from 'react';
import { mount, shallow } from 'enzyme';
import Leaderboard from './Leaderboard';

// Leaderboard is responsible for render the game grid
// CONTRACTS
// 1. 

describe('Leaderboard', () => {
  let props, mountedLeaderboard;
  const leaderboard = () => {
    if(!mountedLeaderboard) {
      mountedLeaderboard = mount(
        <Leaderboard {...props} />
      );
    }
    return mountedLeaderboard;
  };

  beforeEach(() => {
    props = {};
    mountedLeaderboard = undefined;
  });

  it('render the Leaderboard', () => {
    const leaderboardWrapper = shallow(<Leaderboard />);
    expect(leaderboardWrapper).toMatchSnapshot();
  });

  it('render a div as root element', () => {
    const leaderboardElement = leaderboard().find('div');
    let wrappingDiv = leaderboardElement.first();
    expect(wrappingDiv.children()).toEqual(leaderboard().children());
  });
});