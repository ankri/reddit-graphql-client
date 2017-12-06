import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import VibrantColors from '../../propTypes/VibrantColorsShape';

const SubredditLinkWrapper = glamorous.span(
  {
    position: 'relative',
    zIndex: 200,
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 800
  },
  ({ colors }) => {
    if (colors) {
      return {
        color: colors.vibrantDark
      };
    } else {
      return {
        color: 'red'
      };
    }
  }
);

SubredditLinkWrapper.propTypes = {
  colors: VibrantColors
};

const SubredditLink = ({ subreddit, colors }) => (
  <Link to={`/r/${subreddit}`}>
    <SubredditLinkWrapper colors={colors}>r/{subreddit}</SubredditLinkWrapper>
  </Link>
);

SubredditLink.propTypes = {
  colors: VibrantColors,
  subreddit: PropTypes.string.isRequired
};

export default SubredditLink;
