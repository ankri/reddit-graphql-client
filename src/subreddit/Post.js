import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';

const PostWrapper = glamorous.div(
  {
    border: '0.25rem solid #000',
    padding: '1.5rem',
    marginBottom: '2rem',
    ':first-child': {
      marginTop: '2rem'
    }
  },
  ({ swatches }) => {
    if (swatches) {
      return {
        backgroundColor: swatches.vibrant,
        borderColor: swatches.darkVibrant || swatches.vibrant
      };
    } else {
      return {
        backgroundColor: '#000'
      };
    }
  }
);

const PostTitle = glamorous.h2(
  {
    margin: 0,
    marginBottom: '1rem'
  },
  ({ swatches }) => {
    if (swatches) {
      return {
        color: swatches.darkMuted || swatches.muted
      };
    } else {
      return {
        color: '#FFF'
      };
    }
  }
);

const PostContent = glamorous.div({
  display: 'flex',
  padding: '1rem',
  alignItems: 'center',
  flexDirection: 'column'
});

const PostImage = glamorous.img(
  {
    maxWidth: '100%',
    maxHeight: '200vh'
  },
  ({ swatches }) => {
    if (swatches) {
      return {
        border: `0.25rem solid ${swatches.lightVibrant || swatches.darkVibrant}`
      };
    }

    return {};
  }
);

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  componentDidMount() {}

  render() {
    const { post } = this.props;
    let url;
    let isVideo;

    switch (post.domain) {
      case 'gfycat.com':
        url =
          post.url.replace('https://gfycat.com/', 'https://giant.gfycat.com/') +
          '.mp4';
        isVideo = true;
        break;
      case 'i.imgur.com':
        isVideo = post.url.includes('.gifv');
        url = post.url;
        if (isVideo) {
          url = post.url.replace('.gifv', '.mp4');
        }
        break;
      default:
        url = post.url;
        isVideo = post.isVideo;
    }

    return (
      <PostWrapper swatches={post.swatches}>
        <PostContent>
          <PostTitle swatches={post.swatches}>{post.title}</PostTitle>
          {isVideo ? (
            <video src={url} autoPlay={false} controls loop muted />
          ) : (
            <PostImage src={url} alt={post.title} swatches={post.swatches} />
          )}
        </PostContent>
      </PostWrapper>
    );
  }
}

export default Post;
