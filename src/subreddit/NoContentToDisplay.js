import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

import SubredditButton from './SubredditButton';

const NoContent = glamorous.div({
  display: 'flex',
  height: '85vh',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw'
});

const NoContentToDisplay = ({ changeSubreddit }) => (
  <NoContent>
    <h1>No posts found</h1>
    <SubredditButton changeSubreddit={changeSubreddit} subreddit="random">
      Load random subreddit
    </SubredditButton>
  </NoContent>
);

NoContentToDisplay.propTypes = {
  changeSubreddit: PropTypes.func.isRequired
};

export default NoContentToDisplay;
