import fetch from 'isomorphic-fetch';

import {
  VOTE_REQUESTED,
  VOTE_SUCCEEDED,
  VOTE_FAILED,
  VOTE_UPDATED
} from '../constants/action-types';

function validateIdx(idx, teams) {
  // basic parameter validation
  return typeof idx === 'number' && idx >= 0 && idx < teams.length;
}

export function updateVote(idx, count) {
  return {
    type: VOTE_UPDATED,
    idx: idx,
    count: count
  };
}

export const requestVote = idx => (dispatch, getState) => {
  const { teams } = getState();

  if (!validateIdx(idx, teams)) {
    return undefined;
  }

  const team = teams[idx];

  // dispatch the vote request to update optimistically
  dispatch({ type: VOTE_REQUESTED, idx });

  // attempt the vote
  const request = fetch(`/api/vote/${team.name}`, {
    headers: { 'accept': 'application/json' },
    method: 'GET' // lolrest
  });

  const checkStatus = response => {
    if (response.status < 200 || response.status >=300) {
      throw new Error('cannot fetch from api');
    }

    return response;
  }

  request
    .then(checkStatus)
    // .then(() => new Promise((_, reject) => setTimeout(reject, 1000)))
    .then(
      () => dispatch({ type: VOTE_SUCCEEDED, idx }),
      () => dispatch({ type: VOTE_FAILED, idx })
    );
};
