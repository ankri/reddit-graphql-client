import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

import VibrantColorsShape from '../../propTypes/VibrantColorsShape';

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
    maxHeight: '80vh'
  },
  ({ colors }) => {
    if (colors) {
      return {
        border: `0.5rem solid ${colors.muted || colors.vibrantDark}`
      };
    }

    return {};
  }
);
PostImage.propTypes = {
  colors: VibrantColorsShape
};

const Image = ({ url, colors, title }) => (
  <PostImage
    alt={title}
    src={url}
    colors={colors}
    style={{
      ...borders[Math.round(Math.random(borders.length - 1) + 1)]
    }}
  />
);

Image.propTypes = {
  url: PropTypes.string,
  colors: VibrantColorsShape,
  title: PropTypes.string
};

export default Image;
