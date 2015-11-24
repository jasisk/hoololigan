import TeamList from '../components/team-list';
import * as Actions from '../actions/vote';
import { bindActionCreators } from 'redux';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';

class App extends Component {
  render() {
    const { teams, requestVote } = this.props;
    return <TeamList teams={teams} vote={requestVote} />;
  }
}

export default connect(
  state => ({ teams: state.teams }),
  dispatch => bindActionCreators(Actions, dispatch)
)(App);
