import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

import SubredditButton from '../subreddit/SubredditButton';

const Wrapper = glamorous.div({
  display: 'flex',
  height: '85vh',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100vw'
});

const Error = ({ error, subreddit, changeSubreddit }) => (
  <Wrapper>
    <h1>Error fetching {subreddit}</h1>
    <p>{`${error}`}</p>
    <SubredditButton changeSubreddit={changeSubreddit} subreddit="random">
      random
    </SubredditButton>
  </Wrapper>
);

Error.propTypes = {
  error: PropTypes.object,
  subreddit: PropTypes.string,
  changeSubreddit: PropTypes.func
};

export default Error;
