import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import VibrantColors from '../../PropTypes/VibrantColorsShape';

const calculateTitleSize = length => {
  if (length > 175) {
    return '0.75rem';
  }
  if (length > 140) {
    return '1rem';
  }
  if (length > 105) {
    return '1.25rem';
  }
  if (length > 70) {
    return '1.5rem';
  }

  return '2rem';
};

const Title = glamorous.h3(
  {
    margin: 0,
    marginBottom: '1rem',
    textAlign: 'center',
    maxWidth: '90vw',
    width: '30em'
  },
  ({ colors, title }) => {
    if (!colors) {
      return {
        fontSize: calculateTitleSize(title.length),
        colro: '#000'
      };
    }

    if (colors.mutedLight === null || colors.bodyText === colors.mutedLight) {
      return {
        fontSize: calculateTitleSize(title.length),
        color: '#000'
      };
    } else {
      return {
        fontSize: calculateTitleSize(title.length),
        color:
          colors.bodyText || colors.titleText || colors.vibrantDark || '#000'
      };
    }
  }
);
Title.propTypes = {
  colors: VibrantColors,
  title: PropTypes.string
};
Title.defaultProps = {
  imageColors: {}
};

const TitleLink = glamorous.a({
  color: 'inherit',
  background: 'none',
  ':hover': {
    backgroundImage:
      'linear-gradient(5deg,transparent 65%,#0071de 80%,transparent 90%),linear-gradient(165deg,transparent 5%,#0071de 15%,transparent 25%),linear-gradient(165deg,transparent 45%,#0071de 55%,transparent 65%),linear-gradient(15deg,transparent 25%,#0071de 35%,transparent 50%)',
    backgroundRepeat: 'repeat-x',
    backgroundSize: '4px 3px',
    backgroundPosition: '0 90%'
  }
});

const PostTitle = ({ colors, permalink, title }) => (
  <Title colors={colors} title={title}>
    <TitleLink href={`https://reddit.com${permalink}`} target="_blank">
      {title}
    </TitleLink>
  </Title>
);

PostTitle.propTypes = {
  title: PropTypes.string.isRequired,
  permalink: PropTypes.string.isRequired,
  colors: VibrantColors
};

export default PostTitle;
