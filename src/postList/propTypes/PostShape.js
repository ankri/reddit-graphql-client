import PropTypes from 'prop-types';
import MediaShape from './MediaShape';

export default PropTypes.shape({
  author: PropTypes.shape({
    name: PropTypes.string
  }).isRequired,
  id: PropTypes.string.isRequired,
  media: PropTypes.arrayOf(MediaShape),
  permalink: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
});
