import React, { Component } from 'react';
import { connect } from 'react-redux';

const checkStatus = response => {
  if (response.status < 200 || response.status >= 300) {
    throw new Error('could not fetch from api');
  }

  return response;
}

class Poller extends Component {
  updateVotes() {
    const { updateVote, currentVotes } = this.props;
    fetch('/api/teams', {
      accept: 'application/json',
      method: 'GET'
    })
      .then(checkStatus)
      .then(response => response.json())
      .then(response => response.map(team => team.votes))
      .then(votes => {
        votes.forEach((count, i) => {
          if (currentVotes[i] !== count) updateVote(i, count);
        })
      });
  }
  
  componentDidMount() {
    const interval = setInterval(this.updateVotes.bind(this), this.props.interval);
    this.setState({interval});
  }

  componentWillUnmount() {
    if (this.state.interval) {
      clearInterval(this.state.interval);
    }
  }

  render() {
    return this.props.children;
  }
}

Poller.defaultProps = { interval: 2 * 1000 };

export default connect(state => ({ currentVotes: state.teams.map(team => team.votes) }))(Poller);
