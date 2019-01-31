import React, { PureComponent } from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

import PostShape from '../../propTypes/PostShape';
import VibrantColorsShape from '../../propTypes/VibrantColorsShape';
import AlbumNavigation from './AlbumNavigation';
import NoMediaFound from './NoMediaFound';
import Video from './Video';
import Image from './Image';
import PostInformation from '../postInformation/PostInformation';

const AlbumWrapper = glamorous.div({
  display: 'flex',
  flexDirection: 'row',
  overflowX: 'auto',
  maxWidth: '100vw'
});

const Wrapper = glamorous.div(
  {
    position: 'relative',
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
  ({ colors }) => {
    if (colors) {
      return {
        backgroundColor: colors.mutedLight,
        borderColor: colors.mutedDark || colors.vibrant
      };
    } else {
      return {
        backgroundColor: '#000'
      };
    }
  }
);
Wrapper.propTypes = {
  colors: VibrantColorsShape
};

const Content = glamorous.div({
  display: 'flex',
  padding: '1rem',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  height: '100%',
  maxHeight: '100%'
});

class Album extends PureComponent {
  static propTypes = {
    post: PostShape,
    showSubreddit: PropTypes.bool
  };

  render() {
    const { post, showSubreddit } = this.props;
    return (
      <AlbumWrapper>
        {' '}
        {post.media.map((media, index) =>
          !media ? (
            <NoMediaFound media={media} post={post} />
          ) : (
            <Wrapper key={media.id} colors={media.preview.colors}>
              {post.media.length > 1 && <AlbumNavigation />}
              {post.media.length > 1 && <AlbumNavigation right={true} />}
              <Content>
                {media.isVideo ? (
                  <Video url={media.url} />
                ) : (
                  <Image
                    url={media.url}
                    colors={media.preview.colors}
                    title={post.title}
                  />
                )}
                <PostInformation
                  post={post}
                  media={media}
                  showSubreddit={showSubreddit}
                />
              </Content>
            </Wrapper>
          )
        )}
      </AlbumWrapper>
    );
  }
}

export default Album;
