import React from 'react';
import { mount, shallow } from 'enzyme';
import Leaderboard from './Leaderboard';

// Leaderboard is responsible for render the players leaderboard
describe('<Leaderboard />', () => {
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
    const leaderboardWrapper = shallow(<Leaderboard />);
    expect(leaderboardWrapper).toMatchSnapshot();
  });

  it('div contains everything else that gets rendered', () => {
    const leaderboardElement = leaderboard().find('div');
    const wrappingDiv = leaderboardElement.first();
    expect(wrappingDiv.hasClass('leaderboard')).toBeTruthy();
    expect(wrappingDiv.children()).toEqual(leaderboard().children());
  });

  it('should have a title h4 with content Leaderboard', () => {
    const titleElement = leaderboard().find('h4');
    expect(titleElement.length).toEqual(1);
    expect(titleElement.text()).toEqual('Leaderboard');
  });


  it('should have a table', () => {
    const tableElement = leaderboard().find('table');
    expect(tableElement.length).toEqual(1);
  });

  it('should have a thead', () => {
    const theadElement = leaderboard().find('thead');
    expect(theadElement.length).toEqual(1);
  });

  it('should have a tr inside thead', () => {
    const theadElement = leaderboard().find('thead');
    const trElement = theadElement.find('tr');
    expect(trElement.length).toEqual(1);
  });

  it('should have 4 th inside thead', () => {
    const theadElement = leaderboard().find('thead');
    const thElements = theadElement.find('th');
    expect(thElements.length).toEqual(4);
  });

  it('should have a tbody', () => {
    const tbodyElement = leaderboard().find('tbody');
    expect(tbodyElement.length).toEqual(1);
  });

  it('should have a 0 trs inside tbody', () => {
    const tbodyElement = leaderboard().find('tbody');
    const trElement = tbodyElement.find('tr');
    expect(trElement.length).toEqual(0);
  });

  describe('allPlayers props filled', () => {
    beforeEach(() => {
      props.allPlayers = [{name: 'Player 1', wins: 0, defeats: 0, draws: 0}, {name: 'Player 2', wins: 3, defeats: 0, draws: 0}];
    });

    it('should have as many tr as allPlayers props length', () => {
      const tbodyElement = leaderboard().find('tbody');
      const trElement = tbodyElement.find('tr');
      expect(trElement.length).toEqual(2);
    });

    it('should order the players by score', () => {
      const tbodyElement = leaderboard().find('tbody');
      const trElement = tbodyElement.childAt(0);
      const tdElement = trElement.childAt(1);
      expect(tdElement.text()).toEqual('Player 2');
    });
  });
});