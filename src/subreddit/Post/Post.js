import React from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

import Album from './Album/Album';
import PostShape from '../PropTypes/PostShape';

const Post = ({ post }) => <Album post={post} />;

Post.propTypes = {
  post: PostShape.isRequired
};

export default Post;
