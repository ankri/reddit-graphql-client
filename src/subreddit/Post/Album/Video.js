import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { Player, BigPlayButton, ControlBar } from 'video-react';
import 'video-react/dist/video-react.css';

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

Video.propTypes = {
  url: PropTypes.string.isRequired
};

export default Video;
