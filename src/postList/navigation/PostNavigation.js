import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

import { postIdFromHash } from '../../utils/HashUtils';

class PostNavigation extends Component {
  static propTypes = {
    postIds: PropTypes.arrayOf(PropTypes.string)
  };

  goUp = () => {
    const { postIds, location, history } = this.props;
    const currentId = postIdFromHash(location.hash);
    const currentIndex = postIds.indexOf(currentId);
    const nextId =
      postIds[currentIndex - 1 < 0 ? postIds.length - 1 : currentIndex - 1];
    history.replace({
      search: history.location.search,
      hash: nextId
    });
  };

  goDown = () => {
    const { postIds, location, history } = this.props;
    const currentId = postIdFromHash(location.hash);
    const currentIndex = postIds.indexOf(currentId);
    const nextId =
      postIds[(currentIndex + 1) % postIds.length === 0 ? 0 : currentIndex + 1];
    history.replace({
      search: history.location.search,
      hash: nextId
    });
  };
  goRight = () => {
    console.log('right');
  };
  goLeft = () => {
    console.log('left');
  };

  render() {
    return (
      <div>
        {this.props.render(this.goUp, this.goDown, this.goLeft, this.goRight)}
      </div>
    );
  }
}

export default withRouter(PostNavigation);
