import React, { Component } from 'react';
import glamorous from 'glamorous';
import * as glamor from 'glamor';
import Api from './api/Api';
import { query } from './api/Api';
import Subreddit from './subreddit/Subreddit';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const heartBeatAnimation = glamor.css.keyframes({
  '0%': {
    transform: `scale( .75 )`
  },
  '20%': {
    transform: `scale( 1 )`
  },
  '40%': {
    transform: `scale( .75 )`
  },
  '60%': {
    transform: `scale( 1 )`
  },
  '80%': {
    transform: `scale( .75 )`
  },
  '100%': {
    transform: `scale( .75 )`
  }
});

const Loading = glamorous.div({
  display: 'flex',
  height: '85vh',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  animation: `${heartBeatAnimation} 2s infinite`
});

const Error = glamorous.div({
  display: 'flex',
  height: '85vh',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw'
});

const SubredditLoader = ({
  data: { loading, error, subreddit },
  changeSubreddit
}) => {
  if (loading) {
    return (
      <Loading>
        <h1>Loading</h1>
      </Loading>
    );
  } else if (error) {
    console.log(error);
    return (
      <Error>
        <h1>Error</h1>
        <p>{error.toString()}</p>
      </Error>
    );
  } else {
    console.log(subreddit);
    return (
      <Subreddit subreddit={subreddit} changeSubreddit={changeSubreddit} />
    );
  }
};

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
