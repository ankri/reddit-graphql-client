import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import { query } from './api/Api';
import Subreddit from './subreddit/Subreddit';
import Loading from './Loading';
import Error from './Error';

class SubredditLoader extends Component {
  // have to refetch when subredditName props changes
  // TODO find out why. Was working without the explicit refetch before refactoring the code
  componentWillReceiveProps(nextProps) {
    if (
      this.props.subredditName &&
      this.props.subredditName !== nextProps.subredditName
    ) {
      this.props.data.refetch();
    }
  }

  render() {
    const { loading, error, subreddit, variables } = this.props.data;

    if (loading) {
      return <Loading />;
    } else if (error) {
      console.log(error);
      return (
        <Error
          error={error}
          subreddit={variables.name}
          changeSubreddit={this.props.changeSubreddit}
        />
      );
    } else {
      console.log(subreddit);
      return (
        <Subreddit
          subreddit={subreddit}
          changeSubreddit={this.props.changeSubreddit}
        />
      );
    }
  }
}

const SubredditQuery = gql(query);
const SubredditWithData = graphql(SubredditQuery, {
  options: ({ subredditName }) => {
    return {
      variables: {
        name: subredditName,
        color: 'LightMuted'
      }
    };
  }
})(SubredditLoader);

class App extends Component {
  state = {
    subredditName: 'pics'
  };

  changeSubreddit = async subredditName => {
    if (subredditName === 'random' || subredditName === 'randnsfw') {
      const response = await fetch(`/${subredditName}`);
      const json = await response.json();
      console.log(json.name);
      this.setState({
        subredditName: json.name || subredditName
      });
    } else {
      this.setState({
        subredditName
      });
    }
  };

  render() {
    return (
      <SubredditWithData
        subredditName={this.state.subredditName}
        changeSubreddit={this.changeSubreddit}
      />
    );
  }
}

export default App;
