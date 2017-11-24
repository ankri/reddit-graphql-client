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
    minWidth: '100vw',
    maxWidth: '100vw',
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
      if (
        imageColors.mutedLight === null ||
        imageColors.bodyText === imageColors.mutedLight
      ) {
        return {
          color: '#000'
        };
      } else {
        return {
          color:
            imageColors.bodyText ||
            imageColors.titleText ||
            imageColors.vibrantDark
        };
      }
    } else {
      return {
        color: '#FFF'
      };
    }
  }
);

const PostTitleLink = glamorous.a({
  color: 'inherit',
  background: 'none',
  ':hover': {
    backgroundImage:
      'linear-gradient(5deg,transparent 65%,#0071de 80%,transparent 90%),linear-gradient(165deg,transparent 5%,#0071de 15%,transparent 25%),linear-gradient(165deg,transparent 45%,#0071de 55%,transparent 65%),linear-gradient(15deg,transparent 25%,#0071de 35%,transparent 50%)',
    backgroundRepeat: 'repeat-x',
    backgroundSize: '4px 3px',
    backgroundPosition: '0 90%'
  }
});

const PostContent = glamorous.div({
  display: 'flex',
  padding: '1rem',
  alignItems: 'center',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '100%'
});

const borders = [
  {
    borderTopLeftRadius: '255px 15px',
    borderTopRightRadius: '15px 225px',
    borderBottomRightRadius: '225px 15px',
    borderBottomLeftRadius: '15px 255px'
  },
  {
    borderTopLeftRadius: '125px 25px',
    borderTopRightRadius: '10px 205px',
    borderBottomRightRadius: '20px 205px',
    borderBottomLeftRadius: '185px 25px'
  },
  {
    borderTopLeftRadius: '15px 225px',
    borderTopRightRadius: '255px 15px',
    borderBottomRightRadius: '225px 15px',
    borderBottomLeftRadius: '15px 255px'
  },
  {
    borderTopLeftRadius: '15px 225px',
    borderTopRightRadius: '55px 150px',
    borderBottomRightRadius: '25px 115px',
    borderBottomLeftRadius: '155px 25px'
  },
  {
    borderTopLeftRadius: '250px 15px',
    borderTopRightRadius: '25px 80px',
    borderBottomRightRadius: '20px 115px',
    borderBottomLeftRadius: '15px 105px'
  },
  {
    borderTopLeftRadius: '28px 125px',
    borderTopRightRadius: '100px 30px',
    borderBottomRightRadius: '20px 205px',
    borderBottomLeftRadius: '15px 225px'
  }
];

const PostImage = glamorous.img(
  {
    // maxWidth: '90vw',
    maxHeight: '80vh'
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

const VideoWrapper = glamorous.div({
  '> .video-react.video-react-fluid': {
    height: '80vh',
    width: '80vw',
    paddingTop: '0 !important'
  },
  '> .video-react': {
    backgroundColor: 'transparent'
  }
});

const Video = ({ url }) => {
  return (
    <VideoWrapper>
      <Player src={url} fluid>
        <BigPlayButton position="center" />
        <ControlBar autoHide={false} />
      </Player>
    </VideoWrapper>
  );
};

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render() {
    const { post } = this.props;
    const doShowColorDemo = false;

    console.log(post.media);

    return (
      <Album>
        {post.media.map(
          (media, index) =>
            !media ? (
              <h1>No suitable media found for {post.url}</h1>
            ) : (
              <PostWrapper key={media.id} imageColors={media.preview.colors}>
                <PostContent>
                  {media.isVideo ? (
                    <Video url={media.url} />
                  ) : (
                    <PostImage
                      src={media.url}
                      imageColors={media.preview.colors}
                      style={{
                        ...borders[
                          Math.round(Math.random(borders.length - 1) + 1)
                        ]
                      }}
                    />
                  )}
                  <PostTitle imageColors={media.preview.colors}>
                    <PostTitleLink
                      href={`https://reddit.com${post.permalink}`}
                      target="_blank"
                    >
                      {post.title}
                    </PostTitleLink>
                  </PostTitle>
                  <PostFooter>
                    <TimeAgo datetime={post.createdISO} />
                    <Divider>&mdash;</Divider>
                    <LinkWrapper>
                      by
                      <AuthorLink imageColors={media.preview.colors}>
                        {post.author.name}
                      </AuthorLink>
                    </LinkWrapper>
                    <Divider>&mdash;</Divider>
                    <div>
                      Score:{' '}
                      <Score imageColors={media.preview.colors}>
                        {post.score}
                      </Score>
                    </div>
                  </PostFooter>
                </PostContent>
              </PostWrapper>
            )
        )}
      </Album>
    );
  }
}

export default Post;
