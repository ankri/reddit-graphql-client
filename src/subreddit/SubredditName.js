import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const Heading = glamorous.h4({
  margin: 0
});

const Card = glamorous.div({
  backgroundColor: '#FFF',
  zIndex: 200,
  padding: '0.25rem'
});

const SubredditName = ({ name }) => (
  <Card className="card">
    <Heading>r/{name}</Heading>
  </Card>
);

SubredditName.propTypes = {
  name: PropTypes.string.isRequired
};

export default SubredditName;
