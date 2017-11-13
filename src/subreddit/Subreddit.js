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

  render() {
    const { subreddit, changeSubreddit } = this.props;
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
        <Content>
          <KeyboardNavigation posts={subreddit.listings.hot} />
          {subreddit.listings.hot.map(post => (
            <Post post={post} key={post.id} />
          ))}
        </Content>
      </div>
    );
  }
}

export default Subreddit;
