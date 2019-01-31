import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import SubredditButton from './SubredditButton';
import SubredditName from './SubredditName';
import HeaderImage from './HeaderImage';
import PostList from '../postList/PostList';

const TextInput = glamorous.input({
  marginLeft: '1rem',
  border: '1px solid #000',
  padding: '0.5rem'
});

const RandomSubredditButtonContainer = glamorous.div({
  position: 'fixed',
  bottom: '1rem',
  left: '1rem',
  zIndex: 100
});

const HeaderImageContainer = glamorous.div({
  position: 'absolute',
  top: '1rem',
  left: '1rem'
});

const SubredditNameContainer = glamorous.div({
  marginTop: '0.5rem'
});

class Subreddit extends Component {
  static propTypes = {
    subreddit: PropTypes.object,
    loadMore: PropTypes.func
  };

  render() {
    const { subreddit, changeSubreddit } = this.props;
    const posts = subreddit.media.hot.filter(post => post.media !== null);
    console.log(posts);

    // TODO add text input to change subreddit
    return (
      <div>
        <HeaderImageContainer>
          {subreddit.headerImage.url && (
            <HeaderImage
              headerImage={subreddit.headerImage}
              subredditName={subreddit.name}
            />
          )}
          <SubredditNameContainer>
            <SubredditName name={subreddit.name} />
          </SubredditNameContainer>
        </HeaderImageContainer>
        <RandomSubredditButtonContainer>
          <SubredditButton subreddit="randnsfw">random</SubredditButton>
          <SubredditButton subreddit="random">random</SubredditButton>
        </RandomSubredditButtonContainer>
        <PostList posts={posts} loadMore={this.props.loadMore} />
      </div>
    );
  }
}

export default Subreddit;
