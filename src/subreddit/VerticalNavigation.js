import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const VerticalNavigation = glamorous.div(
  {
    zIndex: 20,
    position: 'fixed',
    width: '100vw',
    height: '5rem',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: 'rgba(65, 64, 62, 0.25)'
    }
  },
  ({ down }) => ({
    [down ? 'bottom' : 'top']: 0
  })
);

VerticalNavigation.propTypes = {
  down: PropTypes.boolean
};

export default VerticalNavigation;
