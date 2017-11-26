import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import Headroom from 'react-headroom';

import Post from './Post/Post';
import KeyboardNavigation from './KeyboardNavigation';
import ImageNavigation from './ImageNavigation';

const Navbar = glamorous.div({
  padding: '1.5rem',
  paddingTop: '0.5rem',
  paddingBottom: '0.5rem',
  borderBottom: '1px solid #000',
  backgroundColor: '#FFF',
  display: 'flex',
  flexDirection: 'row',
  position: 'absolute',
  top: '1rem',
  left: '1rem'
});

const NavbarHeading = glamorous.h3({
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

const TextInput = glamorous.input({
  marginLeft: '1rem',
  border: '1px solid #000',
  padding: '0.5rem'
});

const ButtonWrapper = glamorous.div({
  position: 'fixed',
  bottom: '1rem',
  left: '1rem',
  zIndex: 100
});

const VerticalNavigation = glamorous.div(
  {
    zIndex: 20,
    position: 'fixed',
    width: '100vw',
    height: '5rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(65, 64, 62, 0.25)'
    }
  },
  ({ down }) => ({
    [down ? 'bottom' : 'top']: 0
  })
);

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

  goToSubreddit = event => {
    event.preventDefault();
    const newSubreddit = event.target.elements['subreddit'].value;
    this.props.changeSubreddit(newSubreddit);
  };

  render() {
    const { subreddit, changeSubreddit } = this.props;
    const posts = subreddit.media.hot;

    return (
      <div>
        <div
          style={{
            position: 'absolute',
            top: '1rem',
            left: '1rem'
          }}
        >
          {subreddit.headerImage.url && (
            <div
              className="card"
              style={{
                padding: '0.25rem',
                backgroundColor: '#FFF',
                zIndex: 200
              }}
            >
              <img
                src={subreddit.headerImage.url}
                alt=""
                className="no-responsive"
                width={subreddit.headerImage.width}
                height={subreddit.headerImage.height}
              />
            </div>
          )}
          <div
            className="card"
            style={{
              marginTop: '0.5rem',
              padding: '0.25rem',
              backgroundColor: '#FFF',
              zIndex: 200
            }}
          >
            <h4 style={{ margin: 0 }}>r/{subreddit.name}</h4>
          </div>
        </div>
        <ButtonWrapper>
          <ChangeSubredditButton onClick={() => changeSubreddit('random')}>
            random
          </ChangeSubredditButton>
        </ButtonWrapper>
        {!this.state.isError && (
          <ImageNavigation posts={posts}>
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
          </ImageNavigation>
        )}
      </div>
    );
  }
}

export default Subreddit;
