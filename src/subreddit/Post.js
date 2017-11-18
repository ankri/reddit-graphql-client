import React, { Component } from 'react';
import PropTypes from 'prop-types';
import glamorous from 'glamorous';
import TimeAgo from 'timeago-react';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';

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
    textAlign: 'center',
    maxWidth: '90vw',
    width: '30em'
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
    maxWidth: '90vw',
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

const Divider = glamorous.span({
  marginLeft: '0.3rem',
  marginRight: '0.3rem'
});

const LinkWrapper = glamorous.div({});

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

const Album = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'auto',
  maxWidth: '100vw'
});

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render() {
    const { post } = this.props;
    const doShowColorDemo = false;
    const url = post.media.url;
    const isVideo = post.isVideo;
    const isAlbum = post.isAlbum;

    return (
      <PostWrapper imageColors={post.imageColors} id={post.id}>
        <PostContent>
          {isVideo ? (
            <Player src={url} fluid>
              <BigPlayButton position="center" />
              <ControlBar autoHide={false} />
            </Player>
          ) : isAlbum ? (
            <Album>
              {post.media.album.map((url, index) => (
                <PostImage src={url} key={`${post.id}-${index}`} />
              ))}
            </Album>
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
            <Divider>&mdash;</Divider>
            <LinkWrapper>
              by
              <AuthorLink imageColors={post.imageColors}>
                {post.author.name}
              </AuthorLink>
            </LinkWrapper>
            <Divider>&mdash;</Divider>
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
