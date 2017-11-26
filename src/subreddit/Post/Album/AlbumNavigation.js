import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const AlbumNavigation = glamorous.div(
  {
    position: 'absolute',
    width: '5rem',
    height: '100vh',
    ':hover': {
      backgroundColor: 'rgba(65, 64, 62, 0.25)'
    }
  },
  ({ right }) => ({
    [right ? 'right' : 'left']: 0
  })
);

AlbumNavigation.proptTypes = {
  right: PropTypes.boolean
};

export default AlbumNavigation;
