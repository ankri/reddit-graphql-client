import { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { postIdFromHash } from '../../utils/HashUtils';

class JumpToPost extends Component {
  static propTypes = {
    location: PropTypes.shape({
      hash: PropTypes.string
    }),
    history: PropTypes.shape({
      replace: PropTypes.func
    }),
    postIds: PropTypes.arrayOf(PropTypes.string)
  };

  static defaultProps = {
    postIds: []
  };

  state = {
    firstRender: true
  };

  componentWillReceiveProps(nextProps) {
    const { location, history } = nextProps;
    const doScrollIntoView = nextProps.location.state
      ? nextProps.location.state.doScrollIntoView
      : true;

    // TODO maybe add snapping? when the user has ~30% of the post visible scroll it into view?

    // if the user refreshes the page
    if (this.state.firstRender) {
      this.setState(
        {
          firstRender: false
        },
        () => {
          history.replace(
            {
              search: history.location.search,
              hash: postIdFromHash(location.hash)
            },
            {
              doScrollIntoView: true
            }
          );
        }
      );
    } else if (
      location.hash.length === 0 ||
      !nextProps.postIds.includes(postIdFromHash(location.hash))
    ) {
      // after a refresh (but post is no longer available) or a change of subreddits
      // a post could be no longer available after one already loaded more posts, scrolled
      // to a new post and then hit refresh

      const id = nextProps.postIds[0];
      history.replace(
        {
          search: history.location.search,
          hash: id
        },
        {
          doScrollIntoView: true
        }
      );
    } else if (
      this.props.postIds.length > 0 &&
      this.props.postIds.length !== nextProps.postIds.length
    ) {
      // new posts arrived after loading more posts
      // get the last post of the last array (-2 because of 'loadMore')
      const id = this.props.postIds[this.props.postIds.length - 2];
      // the next id in the nextProps now
      const nextId = nextProps.postIds.indexOf(id) + 1;
      this.props.scrollIntoView(nextProps.postIds[nextId]);
    } else if (
      this.props.postIds !== nextProps.postIds &&
      nextProps.postIds.includes(postIdFromHash(location.hash))
    ) {
      // a change in the hash occurred only scroll into view when doScrollIntoView is true
      // otherwise an unwanted snapping would occur when scrolling
      if (doScrollIntoView) {
        const id = postIdFromHash(location.hash);
        this.props.scrollIntoView(id);
      }
    }
  }

  render() {
    return null;
  }
}

export default withRouter(JumpToPost);
