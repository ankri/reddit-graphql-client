import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import subredditQuery from '../api/SubredditQuery';

import Loading from '../api/Loading';
import Error from '../api/Error';
import Subreddit from '../subreddit/Subreddit';

class SubredditLoader extends Component {
  loadMore = after => {
    if (this.props.data && this.props.data.fetchMore) {
      this.props.data.fetchMore({
        variables: {
          ...this.props.data.variables,
          after
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          return {
            ...previousResult,
            subreddit: {
              ...previousResult.subreddit,
              media: {
                hot: [
                  ...previousResult.subreddit.media.hot,
                  ...fetchMoreResult.subreddit.media.hot
                ]
              }
            }
          };
        }
      });
    }
  };

  render() {
    const { loading, error, subreddit, variables } = this.props.data;

    if (loading) {
      return <Loading />;
    } else if (error) {
      console.log(error);
      return <Error error={error} subreddit={variables.name} />;
    } else {
      return <Subreddit subreddit={subreddit} loadMore={this.loadMore} />;
    }
  }
}

const SubredditQuery = gql(subredditQuery);
const SubredditGraphQLContainer = graphql(SubredditQuery, {
  options: ({ match }) => {
    return {
      variables: {
        name: match.params.subreddit,
        color: 'lightMuted'
      }
    };
  }
})(SubredditLoader);

export default SubredditGraphQLContainer;
