import TeamList from './team-list';
import React, { Component } from 'react';

export default class App extends Component {
  vote(idx) {
    const team = this.state.teams[idx];
    team.votes += 1;
    const state = [ ...this.state.teams.slice(0, idx),
                    team,
                    ...this.state.teams.slice(idx + 1) ];
    this.setState(state);
  }
  
  constructor(props) {
    super(props);
    this.state = {
      teams: [
        { name: 'patriots', color: 'navy', votes: 0, text: 'New England Patriots' },
        { name: 'united', color: 'black', votes: 0, text: 'Manchester United' },
        { name: 'city', color: 'red', votes: 0, text: 'Manchester City' }
      ]
    };
  }

  render() {
    const { teams } = this.state;
    return <TeamList teams={teams} vote={this.vote.bind(this)} />;
  }
}
