import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';
import TeamList from './team-list';

function defaultFetch(path) {
  const request = fetch(path, {
    headers: { 'accept': 'application/json' },
    method: 'GET'
  });

  const checkStatus = response => {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('cannot fetch from api'); // this error handling is bad
    }
    return response;
  }

  return request
    .then(checkStatus);
}

export default class App extends Component {
  updateState() {
    const request = defaultFetch('/api/teams');

    return request
      .then(response => response.json())
      .then(json => {
        this.setState({ teams: json });
      })
  }

  vote(idx) {
    const state = this.state.teams;
    const team = state[idx];
    const votes = team.votes;
    const newState = [ ...state.slice(0, idx),
                    { ...team, votes: votes + 1 },
                    ...state.slice(idx + 1) ];
    this.setState({ teams: newState });

    //new Promise((_, reject) => setTimeout(() => reject(), 1 * 1000))
    defaultFetch(`/api/vote/${team.name}`)
      .catch(e => this.setState({ teams: state }))
      .then(response => this.updateState());
  }

  constructor(props) {
    super(props);
    this.state = {
      teams: []
    };
  }

  render() {
    const { teams } = this.state;
    return <TeamList teams={teams} vote={this.vote.bind(this)} />;
  }

  componentDidMount() {
    this.updateState().catch(e => {
      throw new Error(e);
    });
  }
}
