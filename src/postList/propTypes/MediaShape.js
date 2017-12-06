import PropTypes from 'prop-types';
import VibrantColors from './VibrantColorsShape';

export default PropTypes.shape({
  height: PropTypes.number,
  id: PropTypes.string.isRequired,
  isVideo: PropTypes.bool,
  preview: PropTypes.shape({
    colors: VibrantColors,
    width: PropTypes.number,
    height: PropTypes.number,
    url: PropTypes.string
  }),
  url: PropTypes.string.isRequired,
  width: PropTypes.number
});
