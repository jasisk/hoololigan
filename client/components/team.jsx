import React, { PropTypes } from 'react';
const style = {'list-item': 'list-item'};
export default function Team(props) {
  const { color, name, votes, text, vote, idx } = props;
  return (
    <li className={[name, style['list-item']].join(' ')}>
      <h3>{text}</h3>
      <p>{votes} votes</p>
      <a href={`/api/vote/${name}`}
         onClick={(e) => {e.preventDefault(); vote(idx);}}>Vote</a>
    </li>
  );
};
Team.propTypes = {
  idx: PropTypes.number.isRequired,
  vote: PropTypes.func.isRequired,
  votes: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string
};
