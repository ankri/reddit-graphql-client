import React, { Component } from 'react';

import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

import userQuery from '../api/UserQuery';
import Loading from '../api/Loading';
import Error from '../api/Error';

import User from '../user/User';

class UserLoader extends Component {
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
            user: {
              ...previousResult.subreddit,
              media: [
                ...previousResult.user.media,
                ...fetchMoreResult.user.media
              ]
            }
          };
        }
      });
    }
  };

  render() {
    const { loading, error, user, variables } = this.props.data;

    if (loading) {
      return <Loading />;
    } else if (error) {
      console.log(error);
      return <Error error={error} user={variables.name} />;
    } else {
      return (
        <User name={variables.name} user={user} loadMore={this.loadMore} />
      );
    }
  }
}

const UserQuery = gql(userQuery);
const UserGraphQLContainer = graphql(UserQuery, {
  options: ({ match }) => {
    return {
      variables: {
        name: match.params.user,
        color: 'lightMuted'
      }
    };
  }
})(UserLoader);

export default UserGraphQLContainer;
