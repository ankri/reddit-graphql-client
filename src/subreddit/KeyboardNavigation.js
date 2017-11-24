import { Component } from 'react';
import PropTypes from 'prop-types';

class KeyboardNavigation extends Component {
  static propTypes = {
    onUp: PropTypes.func,
    onDown: PropTypes.func,
    onLeft: PropTypes.func,
    onRight: PropTypes.func
  };

  handleKeyEvent = event => {
    switch (event.code) {
      case 'ArrowUp':
        event.preventDefault();
        this.props.onUp();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.props.onDown();
        break;
      case 'ArrowLeft':
        event.preventDefault();
        this.props.onLeft();
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.props.onRight();
        break;
      default:
    }
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyEvent);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyEvent);
  }

  render() {
    return null;
  }
}

export default KeyboardNavigation;
