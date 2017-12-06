import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { postIdFromHash } from '../../utils/HashUtils';

class ScrollSpy extends Component {
  timer = undefined;

  static propTypes = {
    postPositions: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        top: PropTypes.number,
        height: PropTypes.number
      })
    )
  };

  static defaultProps = {
    postPositions: []
  };

  onScrollStop = () => {
    const post = this.props.postPositions.find(
      post =>
        window.scrollY >= post.top && window.scrollY < post.top + post.height
    );

    if (post && post.id !== postIdFromHash(this.props.location.hash)) {
      this.props.history.replace(
        {
          hash: post.id
        },
        {
          doScrollIntoView: false
        }
      );
    }
  };

  handleScroll = () => {
    // only react on scroll stop
    // throttling the event is not as good
    // https://stackoverflow.com/questions/3701311/event-when-user-stops-scrolling
    clearTimeout(this.timer);
    this.timer = setTimeout(this.onScrollStop, 150);
  };

  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll);
  }

  render() {
    // no need for a render. the component only updates the history
    return null;
  }
}

export default withRouter(ScrollSpy);
