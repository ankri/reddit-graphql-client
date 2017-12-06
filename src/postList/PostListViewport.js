import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import ScrollSpy from './navigation/ScrollSpy';
import KeyboardNavigation from './navigation/KeyboardNavigation';
import PostNavigation from './navigation/PostNavigation';
import VerticalNavigation from './navigation/VerticalNavigation';
import JumpToPost from './navigation/JumpToPost';

import PostShape from './propTypes/PostShape';

const Content = glamorous.div({
  width: '100vw'
});

class PostListViewport extends Component {
  state = {
    postPositions: []
  };

  static propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string
    }),
    history: PropTypes.shape({
      replace: PropTypes.func
    }),
    posts: PropTypes.arrayOf(PostShape)
  };

  scrollIntoView = id => {
    // defer rendering to make sure that the post has already been rendered
    requestAnimationFrame(() => {
      const domNode = document.getElementById(id);
      if (domNode) {
        domNode.scrollIntoView();
      }
    });
  };

  getPostPositions(postIds) {
    return postIds.map((id, index) => {
      const viewportHeight = Math.max(
        document.documentElement.clientHeight,
        window.innerHeight || 0
      );
      return {
        id,
        top: index * viewportHeight,
        height: viewportHeight
      };
    });
  }

  componentWillReceiveProps(nextProps) {
    // update post positions and ids after receiving more posts from loadMore
    if (nextProps.posts !== this.props.posts) {
      const postIds = [...nextProps.posts.map(post => post.id), 'loadMore'];

      this.setState({
        postPositions: this.getPostPositions(postIds),
        postIds
      });
    }
  }

  componentDidMount() {
    // initialize post ids and positions
    const postIds = [...this.props.posts.map(post => post.id), 'loadMore'];

    this.setState({
      postPositions: this.getPostPositions(postIds),
      postIds
    });
  }

  render() {
    return (
      <Content>
        <ScrollSpy postPositions={this.state.postPositions} />
        <JumpToPost
          postIds={this.state.postIds}
          scrollIntoView={this.scrollIntoView}
        />
        <PostNavigation
          postIds={this.state.postIds}
          render={(goUp, goDown, goLeft, goRight) => [
            <KeyboardNavigation
              key="keyboardnavigation"
              onUp={goUp}
              onDown={goDown}
            />,
            <VerticalNavigation
              key="verticalnavigation-up"
              down={false}
              onClick={goUp}
            />,
            <VerticalNavigation
              key="verticalnavigation-down"
              down={true}
              onClick={goDown}
            />
          ]}
        />
        {this.props.children}
      </Content>
    );
  }
}

export default PostListViewport;
