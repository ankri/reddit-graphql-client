import React, { Component } from 'react';
import glamorous from 'glamorous';

import Author from './Author';
import Divider from './Divider';

import PostShape from '../../propTypes/PostShape';
import MediaShape from '../../propTypes/MediaShape';
import VibrantColorsShape from '../../propTypes/VibrantColorsShape';

const Wrapper = glamorous.div({
  position: 'relative'
});

const Badge = glamorous.span(
  {
    cursor: 'pointer',
    position: 'relative',
    zIndex: 100
  },
  ({ colors }) => {
    return {
      backgroundColor: colors ? colors.vibrant : '#0071de',
      ':hover': {
        backgroundColor: colors ? colors.vibrantDark : '#0061de'
      }
    };
  }
);
Badge.propTypes = {
  colors: VibrantColorsShape
};

const PopOverWrapper = glamorous.div({
  position: 'absolute',
  bottom: '2rem',
  right: '-8rem'
});

const PopOverBody = glamorous.div({
  width: '75vw',
  backgroundColor: '#FFF',
  border: '2px solid #41403e',
  borderTopLeftRadius: '255px 15px',
  borderTopRightRadius: '15px 225px',
  borderBottomLeftRadius: '225px 15px',
  borderBottomRightRadius: '15px 225px',
  maxHeight: '50vh',
  overflowY: 'auto',
  paddingTop: '1rem',
  paddingBottom: '1rem'
});

const UrlList = glamorous.ul({
  marginLeft: 0
});

const UrlListItem = glamorous.li({
  ':before': {
    content: 'none'
  },
  display: 'flex',
  textIndent: 0
});

class PopOver extends Component {
  static propTypes = {
    posts: PostShape,
    media: MediaShape
  };

  render() {
    const { post, media } = this.props;
    const urls = post.urlsInComments
      .slice()
      .sort((urlA, urlB) => urlB.score - urlA.score);
    return (
      <PopOverWrapper>
        <PopOverBody>
          <UrlList>
            {urls.map((url, index) => (
              <UrlListItem key={`${post.id}-url-${index}`}>
                <Badge className="badge" colors={media.preview.colors}>
                  {url.score} &uarr;
                </Badge>{' '}
                <Divider>-</Divider>
                <Author name={url.author} colors={media.preview.colors} />
                <Divider>-</Divider>
                <a
                  href={url.url}
                  target={url.url.indexOf('/r/') === 0 ? '_self' : '_blank'}
                  rel="nofollow"
                  dangerouslySetInnerHTML={{ __html: url.title }}
                />
              </UrlListItem>
            ))}
          </UrlList>
        </PopOverBody>
      </PopOverWrapper>
    );
  }
}

class UrlsInComments extends Component {
  static propTypes = {
    posts: PostShape,
    media: MediaShape
  };

  state = {
    isOpen: false
  };

  handleDocumentClick = event => {
    if (
      event.target.nodeName.toLowerCase() !== 'a' &&
      event.target.nodeName.toLowerCase() !== 'button'
    ) {
      this.setState(
        {
          isOpen: false
        },
        () => {
          document.removeEventListener('click', this.handleDocumentClick);
        }
      );
    }
  };

  toggleOpen = () => {
    this.setState(
      previousState => ({
        isOpen: !previousState.isOpen
      }),
      () => {
        if (this.state.isOpen) {
          document.addEventListener('click', this.handleDocumentClick);
        } else {
          document.removeEventListener('click', this.handleDocumentClick);
        }
      }
    );
  };

  render() {
    const { post, media } = this.props;
    return (
      <Wrapper>
        {this.state.isOpen && <PopOver post={post} media={media} />}
        <Badge
          className="badge"
          colors={media.preview.colors}
          onClick={this.toggleOpen}
        >
          {post.urlsInComments.length} URLs
        </Badge>
      </Wrapper>
    );
  }
}

export default UrlsInComments;
