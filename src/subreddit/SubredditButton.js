import React, { Component } from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Button = glamorous.button({
  marginLeft: '1rem',
  fontSize: '1.5rem',
  backgroundColor: '#FFF',
  cursor: 'pointer',
  border: '1px solid #000',
  ':active': {
    backgroundColor: 'rgba(255,255,255,0.5)'
  }
});

class SubredditButton extends Component {
  static propTypes = {
    subreddit: PropTypes.string.isRequired,
    children: PropTypes.node
  };

  handleClick = async () => {
    const { subreddit, history } = this.props;

    // the server can correctly load a random subreddit but apparently appollo's client cache
    // sees `random` as a key and does not correctly resolve to a random subreddit
    if (subreddit === 'random' || subreddit === 'randnsfw') {
      const response = await fetch(`/${subreddit}`);
      const json = await response.json();
      console.log(json.name);
      history.push(`/r/${json.name}`);
    } else {
      history.push(`/r/${subreddit}`);
    }
  };

  render() {
    return (
      <Button type="button" onClick={this.handleClick}>
        {this.props.children}
      </Button>
    );
  }
}

export default withRouter(SubredditButton);
