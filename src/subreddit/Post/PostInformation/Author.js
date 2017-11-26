import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

import VibrantColors from '../../PropTypes/VibrantColorsShape';

const AuthorLink = glamorous.a(
  {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 800,
    marginLeft: '0.3rem'
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
    by
    <AuthorLink colors={colors}>{name}</AuthorLink>
  </div>
);

Author.propTypes = {
  colors: VibrantColors,
  name: PropTypes.string.isRequired
};

export default Author;
