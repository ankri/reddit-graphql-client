import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const LoadMoreWrapper = glamorous.div({
  width: '100vw',
  height: '100vh',
  borderBottom: '1rem solid #000',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
});

const LoadMoreButton = glamorous.button({
  padding: '0.5rem'
});

const LoadMorePosts = ({ loadMore }) => (
  <LoadMoreWrapper>
    <LoadMoreButton type="button" onClick={loadMore}>
      Load more
    </LoadMoreButton>
  </LoadMoreWrapper>
);

LoadMorePosts.propTypes = {
  loadMore: PropTypes.func
};

export default LoadMorePosts;
