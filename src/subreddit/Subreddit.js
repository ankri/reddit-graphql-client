import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Headroom from 'react-headroom';

import Post from './Post';
import KeyboardNavigation from './KeyboardNavigation';

const Navbar = glamorous.div({
  padding: '1.5rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid #000',
  backgroundColor: '#FFF'
});

const NavbarHeading = glamorous.h1({
  margin: 0
});

const HeaderImage = glamorous.img({
  marginBottom: 0,
  verticalAlign: 'middle',
  marginRight: '1rem',
  maxHeight: '64px'
});

const Content = glamorous.div({
  // margin: '0 auto',
  width: '100vw'
});

const NoContent = glamorous.div({
  display: 'flex',
  height: '85vh',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw'
});

const ChangeSubredditButton = glamorous.button({
  marginLeft: '1rem',
  fontSize: '1.5rem',
  backgroundColor: '#FFF',
  cursor: 'pointer',
  border: '1px solid #000'
});

class Subreddit extends Component {
  static propTypes = {
    subreddit: PropTypes.object,
    changeSubreddit: PropTypes.func
  };

  state = {
    isError: false
  };

  componentDidCatch() {
    this.setState({
      isError: true
    });
  }

  render() {
    const { subreddit, changeSubreddit } = this.props;
    const posts = subreddit.media.hot;

    return (
      <div>
        <Headroom>
          <Navbar>
            <NavbarHeading>
              {subreddit.headerImage && (
                <HeaderImage src={subreddit.headerImage.url} />
              )}{' '}
              r/{subreddit.name}
              <ChangeSubredditButton
                type="button"
                onClick={() => changeSubreddit('random')}
              >
                random
              </ChangeSubredditButton>
            </NavbarHeading>
          </Navbar>
        </Headroom>
        {!this.state.isError && (
          <Content>
            <KeyboardNavigation posts={posts} />
            {posts.map(post => <Post post={post} key={post.id} />)}
            {posts.length === 0 && (
              <NoContent>
                <h1>No posts found</h1>
                <ChangeSubredditButton
                  type="button"
                  onClick={() => changeSubreddit('random')}
                >
                  Load random subreddit
                </ChangeSubredditButton>
              </NoContent>
            )}
          </Content>
        )}
      </div>
    );
  }
}

export default Subreddit;
