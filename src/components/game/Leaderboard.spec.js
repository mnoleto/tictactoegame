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
    props = {
      allPlayers: []
    };
    mountedLeaderboard = undefined;
  });

  it('should render the Leaderboard', () => {
    let leaderboardWrapper = shallow(<Leaderboard />);
    expect(leaderboardWrapper).toMatchSnapshot();
  });

  it('div contains everything else that gets rendered', () => {
    let leaderboardElement = leaderboard().find('div');
    let wrappingDiv = leaderboardElement.first();
    expect(wrappingDiv.children()).toEqual(leaderboard().children());
  });

  it('should have a title h4', () => {

  });


  it('should have a table', () => {
    
  });

  it('should have a thead', () => {
    
  });

  it('should have a tr inside thead', () => {
    
  });

  it('should have 4 th inside thead', () => {
    
  });

  it('should have a tbody', () => {
    
  });

  it('should have a 0 trs inside tbody', () => {
    
  });

  describe('allPlayers props filled', () => {
    it('should have as many tr as allPlayers props length', () => {
      
    });

    it('should order the players by score', () => {
      
    });
  });
});