import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

import VibrantColors from '../../PropTypes/VibrantColorsShape';

const ColoredScore = glamorous.span({}, ({ colors }) => {
  if (colors) {
    return {
      color: colors.mutedDark
    };
  }
});
ColoredScore.propTypes = {
  colors: VibrantColors
};

const Score = ({ score, colors }) => (
  <div>
    Score <ColoredScore colors={colors}>{score}</ColoredScore>
  </div>
);

Score.propTypes = {
  colors: VibrantColors,
  score: PropTypes.number
};

export default Score;
