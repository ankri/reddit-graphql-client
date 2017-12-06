import React from 'react';
import PropTypes from 'prop-types';

import Album from './album/Album';
import PostShape from '../propTypes/PostShape';

// TODO legacy component. remove? because right now it's only a wrapper around album
const Post = ({ post, showSubreddit }) => (
  <Album post={post} showSubreddit={showSubreddit} />
);

Post.propTypes = {
  post: PostShape.isRequired,
  showSubreddit: PropTypes.bool
};

export default Post;
