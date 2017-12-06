import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import TimeAgo from 'timeago-react';

import Author from './Author';
import SubredditLink from './SubredditLink';
import Score from './Score';
import PostTitle from './PostTitle';
import UrlsInComments from './UrlsInComments';
import Divider from './Divider';

import PostShape from '../../propTypes/PostShape';
import MediaShape from '../../propTypes/MediaShape';
import VibrantColorsShape from '../../propTypes/VibrantColorsShape';

const PostFooter = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
});
const PostInformationWrapper = glamorous.div({
  marginTop: '0.5rem'
});

const Badge = glamorous.div({}, ({ colors }) => {
  if (colors) {
    return {
      backgroundColor: colors.vibrantDark
    };
  }
});
Badge.propTypes = {
  colors: VibrantColorsShape
};

const PostInformation = ({ media, post, showSubreddit }) => {
  return (
    <PostInformationWrapper>
      <PostTitle
        colors={media.preview.colors}
        title={post.title}
        permalink={post.permalink}
      />
      <PostFooter>
        {showSubreddit && [
          <SubredditLink
            colors={media.preview.colors}
            subreddit={post.subreddit}
            key={`${post.id}-subreddit-link`}
          />,
          <Divider key={`${post.id}-subreddit-divider`}>&mdash;</Divider>
        ]}
        <TimeAgo datetime={post.createdISO} />
        <Divider>&mdash;</Divider>
        <Author name={post.author.name} colors={media.preview.colors} />
        <Divider>&mdash;</Divider>
        <Score score={post.score} colors={media.preview.colors} />
        {post.urlsInComments.length > 0 && [
          <Divider key={`${post.id}-urls-divider`}>&mdash;</Divider>,
          <UrlsInComments key={`${post.id}-urls`} post={post} media={media} />
        ]}
        {post.media.length > 1 && [
          <Divider key={`${post.id}-album-divider`}>&mdash;</Divider>,
          <Badge
            key={`${post.id}-album-info`}
            colors={media.preview.colors}
            className="badge"
          >
            {post.media.length} Pics
          </Badge>
        ]}
      </PostFooter>
    </PostInformationWrapper>
  );
};

PostInformation.propTypes = {
  media: MediaShape,
  post: PostShape,
  showSubreddit: PropTypes.bool
};

export default PostInformation;
