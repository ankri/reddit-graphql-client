import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import VibrantColors from '../../propTypes/VibrantColorsShape';

const AuthorLink = glamorous.span(
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

AuthorLink.propTypes = {
  colors: VibrantColors
};

const Author = ({ name, colors }) => (
  <div>
    by{` `}
    <Link to={`/u/${name}`}>
      <AuthorLink colors={colors}>{name}</AuthorLink>
    </Link>
  </div>
);

Author.propTypes = {
  colors: VibrantColors,
  name: PropTypes.string.isRequired
};

export default Author;
