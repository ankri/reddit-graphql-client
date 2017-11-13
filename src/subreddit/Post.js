import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TimeAgo from 'timeago-react';

const PostWrapper = glamorous.div(
  {
    minHeight: '100vh',
    maxHeigth: '100vh',
    borderBottom: '1rem solid #000',
    padding: '1.5rem',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ({ imageColors }) => {
    if (imageColors) {
      return {
        backgroundColor: imageColors.mutedLight,
        borderColor: imageColors.mutedDark || imageColors.vibrant
      };
    } else {
      return {
        backgroundColor: '#000'
      };
    }
  }
);

const PostTitle = glamorous.h3(
  {
    margin: 0,
    marginBottom: '1rem',
    textAlign: 'center'
  },
  ({ imageColors }) => {
    if (imageColors) {
      return {
        color: imageColors.titleColor
        // '-webkit-text-stroke': '1px #000'
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
    maxHeight: '80vh',
    borderRadius: '1rem'
  },
  ({ imageColors }) => {
    if (imageColors) {
      return {
        border: `0.5rem solid ${imageColors.muted || imageColors.vibrantDark}`
      };
    }

    return {};
  }
);

const PostFooter = glamorous.div({
  display: 'flex',
  flexDirection: 'row'
});

const ColorDemoContainer = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  border: '2px solid #000'
});

const AuthorLink = glamorous.a(
  {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 800,
    marginLeft: '0.3rem'
  },
  ({ imageColors }) => {
    if (imageColors) {
      return {
        color: imageColors.vibrantDark
      };
    }
  }
);

const Score = glamorous.span({}, ({ imageColors }) => {
  if (imageColors) {
    return {
      color: imageColors.mutedDark
    };
  }
});

const LinkWrapper = glamorous.div({
  marginLeft: '0.3rem',
  marginRight: '0.3rem'
});

const ColorDemo = glamorous.div(
  {
    width: '2rem',
    height: '2rem'
  },
  ({ imageColors, color }) => {
    if (imageColors) {
      return {
        backgroundColor: imageColors[color]
      };
    }
  }
);

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

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

    const doShowColorDemo = false;

    return (
      <PostWrapper imageColors={post.imageColors} id={post.id}>
        <PostContent>
          {isVideo ? (
            <video src={url} autoPlay={false} controls loop muted />
          ) : (
            <PostImage
              src={url}
              alt={post.title}
              imageColors={post.imageColors}
            />
          )}
          <PostTitle imageColors={post.imageColors}>{post.title}</PostTitle>
          <PostFooter>
            <TimeAgo datetime={post.createdISO} />
            <LinkWrapper>
              by
              <AuthorLink imageColors={post.imageColors}>
                {post.author.name}
              </AuthorLink>
            </LinkWrapper>
            <div>
              Score: <Score imageColors={post.imageColors}>{post.score}</Score>
            </div>
          </PostFooter>

          {doShowColorDemo && (
            <ColorDemoContainer>
              <ColorDemo
                imageColors={post.imageColors}
                color="vibrant"
                title="vibrant"
              />
              <ColorDemo
                imageColors={post.imageColors}
                color="vibrantLight"
                title="vibrantLight"
              />
              <ColorDemo
                imageColors={post.imageColors}
                color="vibrantDark"
                title="vibrantDark"
              />
              <ColorDemo
                imageColors={post.imageColors}
                color="muted"
                title="muted"
              />
              <ColorDemo
                imageColors={post.imageColors}
                color="mutedLight"
                title="mutedLight"
              />
              <ColorDemo
                imageColors={post.imageColors}
                color="mutedDark"
                title="mutedDark"
              />
            </ColorDemoContainer>
          )}
        </PostContent>
      </PostWrapper>
    );
  }
}

export default Post;
