import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Album from './album/Album';
import PostShape from '../propTypes/PostShape';

// TODO legacy component. remove? because right now it's only a wrapper around album
class Post extends PureComponent {
  static propTypes = {
    post: PostShape.isRequired,
    showSubreddit: PropTypes.bool
  };

  render() {
    const { post, showSubreddit } = this.props;
    return <Album post={post} showSubreddit={showSubreddit} />;
  }
}

export default Post;
