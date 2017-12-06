import React from 'react';
import glamorous from 'glamorous';

import SubredditButton from '../subreddit/SubredditButton';

const NoContent = glamorous.div({
  display: 'flex',
  height: '85vh',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw'
});

const NoContentToDisplay = () => (
  <NoContent>
    <h1>No posts found</h1>
    <SubredditButton subreddit="randnsfw">
      Load random subreddit
    </SubredditButton>
  </NoContent>
);

export default NoContentToDisplay;
