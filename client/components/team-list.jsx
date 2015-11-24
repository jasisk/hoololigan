import React, { PropTypes } from 'react';
import style from './team-list.css';
import Team from './team';

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

