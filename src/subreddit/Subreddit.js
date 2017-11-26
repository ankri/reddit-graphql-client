import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import Post from './Post/Post';
import KeyboardNavigation from './KeyboardNavigation';
import PostNavigation from './PostNavigation';
import SubredditButton from './SubredditButton';
import NoContentToDisplay from './NoContentToDisplay';
import SubredditName from './SubredditName';
import HeaderImage from './HeaderImage';
import VerticalNavigation from './VerticalNavigation';

const Content = glamorous.div({
  width: '100vw'
});

const TextInput = glamorous.input({
  marginLeft: '1rem',
  border: '1px solid #000',
  padding: '0.5rem'
});

const ChangeSubredditPosition = glamorous.div({
  position: 'fixed',
  bottom: '1rem',
  left: '1rem',
  zIndex: 100
});

const HeaderImagePosition = glamorous.div({
  position: 'absolute',
  top: '1rem',
  left: '1rem'
});

const SubredditNamePosition = glamorous.div({
  marginTop: '0.5rem'
});

class Subreddit extends Component {
  static propTypes = {
    subreddit: PropTypes.object,
    changeSubreddit: PropTypes.func
  };

  goToSubreddit = event => {
    event.preventDefault();
    const newSubreddit = event.target.elements['subreddit'].value;
    this.props.changeSubreddit(newSubreddit);
  };

  render() {
    const { subreddit, changeSubreddit } = this.props;
    const posts = subreddit.media.hot.filter(post => post.media !== null);

    return (
      <div>
        <HeaderImagePosition>
          {subreddit.headerImage.url && (
            <HeaderImage
              headerImage={subreddit.headerImage}
              subredditName={subreddit.name}
            />
          )}
          <SubredditNamePosition>
            <SubredditName name={subreddit.name} />
          </SubredditNamePosition>
        </HeaderImagePosition>
        <ChangeSubredditPosition>
          <SubredditButton changeSubreddit={changeSubreddit} subreddit="random">
            random
          </SubredditButton>
        </ChangeSubredditPosition>
        {posts.length === 0 ? (
          <NoContentToDisplay changeSubreddit={changeSubreddit} />
        ) : (
          <PostNavigation posts={posts}>
            {(goUp, goDown, goLeft, goRight) => (
              <Content>
                <KeyboardNavigation
                  onUp={goUp}
                  onDown={goDown}
                  onLeft={goLeft}
                  onRight={goRight}
                />
                <VerticalNavigation onClick={goUp} />
                <VerticalNavigation down={true} onClick={goUp} />
                {posts.map(post => (
                  <div id={post.id} key={post.id}>
                    <Post post={post} />
                  </div>
                ))}
              </Content>
            )}
          </PostNavigation>
        )}
      </div>
    );
  }
}

export default Subreddit;
