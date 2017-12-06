import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import Username from './Username';
import PostList from '../postList/PostList';

const HeaderImageContainer = glamorous.div({
  position: 'absolute',
  top: '1rem',
  left: '1rem'
});

const UsernameContainer = glamorous.div({
  marginTop: '0.5rem'
});

class User extends Component {
  static propTypes = {
    subreddit: PropTypes.object,
    loadMore: PropTypes.func
  };

  render() {
    const { user, name, loadMore } = this.props;
    const posts = user.media.filter(post => post.media !== null);

    return (
      <div>
        <HeaderImageContainer>
          <UsernameContainer>
            <Username name={name} />
          </UsernameContainer>
        </HeaderImageContainer>
        <PostList posts={posts} loadMore={loadMore} showSubreddit={true} />
      </div>
    );
  }
}

export default User;
