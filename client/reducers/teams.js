import DB from '../../db/super-amazing-nosql-cassandra-rethink-mongo-hyper-turbo-shard-cdrom-database';
import { combineReducers } from 'redux';
import {
  VOTE_REQUESTED,
  VOTE_SUCCEEDED,
  VOTE_FAILED,
  VOTE_UPDATED
} from '../constants/action-types';

const name = (state = 'team') => state;
const text = (state = 'Team') => state;
const color = (state = 'transparent') => state;

export default function teams(state = DB.teams, action) {
  if (action.idx !== undefined) {
    const team = state[action.idx];
    const newTeam = combineReducers({
      name,
      text,
      color,
      votes
    })(team, action);

    if (team !== newTeam) {
      return [ ...state.slice(0, action.idx),
        newTeam,
        ...state.slice(action.idx + 1)];
    } else {
      return state;
    }
  }
  return state;
}

function votes(state = 0, action) {
  switch (action.type) {
  case VOTE_REQUESTED:
    return state + 1;
  case VOTE_FAILED:
    return state - 1;
  case VOTE_UPDATED:
    return action.count;
  default:
    return state;
  }
}
