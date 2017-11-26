import React from 'react';

import PostShape from '../../PropTypes/PostShape';
import MediaShape from '../../PropTypes/MediaShape';
import PostInformation from '../PostInformation/PostInformation';

const NoMediaFound = ({ post, media }) => (
  <div>
    <h1>No suitable media found for {media.url}</h1>
    <PostInformation post={post} media={media} />
  </div>
);

NoMediaFound.propTypes = {
  post: PostShape,
  media: MediaShape
};

export default NoMediaFound;
