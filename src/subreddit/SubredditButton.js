import React, { Component } from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

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
    changeSubreddit: PropTypes.func.isRequired,
    subreddit: PropTypes.string.isRequired
  };

  handleClick = () => {
    this.props.changeSubreddit(this.props.subreddit);
  };

  render() {
    return (
      <Button type="button" onClick={this.handleClick}>
        {this.props.children}
      </Button>
    );
  }
}

export default SubredditButton;
