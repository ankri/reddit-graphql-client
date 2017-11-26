import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';

import Author from './Author';
import Score from './Score';
import PostTitle from './PostTitle';
import PostShape from '../../PropTypes/PostShape';
import MediaShape from '../../PropTypes/MediaShape';

const PostFooter = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
});

const Divider = glamorous.span({
  marginLeft: '0.3rem',
  marginRight: '0.3rem'
});

const PostInformationWrapper = glamorous.div({
  marginTop: '0.5rem'
});

const PostInformation = ({ media, post }) => {
  return (
    <PostInformationWrapper>
      <PostTitle
        colors={media.preview.colors}
        title={post.title}
        permalink={post.permalink}
      />
      <PostFooter>
        <TimeAgo datetime={post.createdISO} />
        <Divider>&mdash;</Divider>
        <Author name={post.author.name} colors={media.preview.colors} />
        <Divider>&mdash;</Divider>
        <Score score={post.score} colors={media.preview.colors} />
      </PostFooter>
    </PostInformationWrapper>
  );
};

PostInformation.propTypes = {
  media: MediaShape,
  post: PostShape
};

export default PostInformation;
