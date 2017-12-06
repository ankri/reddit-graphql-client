import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import NoContentToDisplay from './NoContentToDisplay';
import LoadMorePosts from './LoadMorePosts';
import Post from './post/Post';
import PostListViewport from './PostListViewport';

import PostShape from './propTypes/PostShape';

class PostList extends Component {
  static propTypes = {
    posts: PropTypes.arrayOf(PostShape),
    loadMore: PropTypes.func,
    showSubreddit: PropTypes.bool
  };

  static defaultProps = {
    showSubreddit: false
  };

  loadMorePosts = () => {
    const lastPost = this.props.posts.slice(-1).pop();
    this.props.loadMore(lastPost.name);
  };

  render() {
    const { posts, showSubreddit } = this.props;
    if (posts.length === 0) {
      return <NoContentToDisplay />;
    } else {
      return (
        <Route
          render={routerProps => (
            <Switch>
              <Route exact path={`${routerProps.match.pathname}/`}>
                <Redirect to={{ hash: posts[0].id }} />
              </Route>
              <Route>
                <PostListViewport {...routerProps} posts={posts}>
                  {posts.map(post => (
                    <div id={post.id} key={post.id}>
                      <Post post={post} showSubreddit={showSubreddit} />
                    </div>
                  ))}
                  <div id="loadMore">
                    <LoadMorePosts loadMore={this.loadMorePosts} />
                  </div>
                </PostListViewport>
              </Route>
            </Switch>
          )}
        />
      );
    }
  }
}
export default PostList;
