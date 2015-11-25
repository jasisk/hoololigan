import React, { PropTypes } from 'react';
import Team from './team';
const style={list: 'list'};

export default function TeamList(props) {
  const { teams, vote } = props;
  return (
    <ul className={style.list}>
      {teams.map((team, idx) => <Team {...team} vote={vote} idx={idx} />)}
    </ul>
  ); 
}
TeamList.propTypes = {
  teams: PropTypes.array.isRequired,
  vote: PropTypes.func.isRequired
};

