import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Headroom from 'react-headroom';

import Post from './Post';

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
  marginRight: '1rem'
});

const Content = glamorous.div({
  margin: '0 auto',
  width: '80vw'
});

const ChangeSubredditButton = glamorous.button({
  marginLeft: '1rem',
  fontSize: '1.5rem',
  backgroundColor: '#FFF',
  cursor: 'pointer',
  border: '1px solid #000'
});

const Subreddit = ({ subreddit, changeSubreddit }) => {
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
        {subreddit.listings.hot.map(post => <Post post={post} key={post.id} />)}
      </Content>
    </div>
  );
};
Subreddit.propTypes = {
  subreddit: PropTypes.object,
  changeSubreddit: PropTypes.func
};

export default Subreddit;
