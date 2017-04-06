import React from 'react';
import { mount, shallow } from 'enzyme';
import LeaderboardTr from './LeaderboardTr';

// LeaderboardTr is responsible for render the leaderboard table line
describe('<LeaderboardTr />', () => {
  let props, mountedLeaderboardTr;
  const leaderboardTr = () => {
    if(!mountedLeaderboardTr) {
      mountedLeaderboardTr = mount(
        <table>
          <tbody>
            <LeaderboardTr {...props} />
          </tbody>
        </table>
      );
    }
    return mountedLeaderboardTr;
  };

  beforeEach(() => {
    props = {
      defeats: 0,
      draws: 0,
      name: 'Player 1',
      position: 0,
      wins: 0
    };
    mountedLeaderboardTr = undefined;
  });

  it('should render the LeaderboardTr', () => {
    const leaderboardTrWrapper = shallow(
      <table>
        <tbody>
          <LeaderboardTr {...props} />
        </tbody>
      </table>
    );
    expect(leaderboardTrWrapper).toMatchSnapshot();
  });

  it('should have 5 td', () => {
    const tdElements = leaderboardTr().find('td');
    expect(tdElements.length).toEqual(5);
  });

  it('should the first td has the player position', () => {
    const trRenderer = leaderboardTr();
    const trElement = trRenderer.find('tr');
    const firstTd = trElement.childAt(0);
    expect(firstTd.hasClass('position')).toBeTruthy();
  });

  it('should the second td has the player name', () => {
    const trRenderer = leaderboardTr();
    const trElement = trRenderer.find('tr');
    const firstTd = trElement.childAt(1);
    expect(firstTd.hasClass('name')).toBeTruthy();
  });

  it('should the third td has the wins score', () => {
    const trRenderer = leaderboardTr();
    const trElement = trRenderer.find('tr');
    const firstTd = trElement.childAt(2);
    expect(firstTd.hasClass('wins')).toBeTruthy();
  });

  it('should the forth td has the defeats score', () => {
    const trRenderer = leaderboardTr();
    const trElement = trRenderer.find('tr');
    const firstTd = trElement.childAt(3);
    expect(firstTd.hasClass('defeats')).toBeTruthy();
  });

  it('should the fifth td has the draws score', () => {
    const trRenderer = leaderboardTr();
    const trElement = trRenderer.find('tr');
    const firstTd = trElement.childAt(4);
    expect(firstTd.hasClass('draws')).toBeTruthy();
  });
});