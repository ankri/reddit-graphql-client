import React from 'react';
import glamorous from 'glamorous';
import PropTypes from 'prop-types';

const Card = glamorous.div({
  padding: '0.25rem',
  backgroundColor: '#FFF',
  zIndex: 200
});

const HeaderImage = ({ headerImage, subredditName }) => (
  <Card className="card">
    <img
      src={headerImage.url}
      alt={subredditName}
      className="no-responsive"
      width={headerImage.width}
      height={headerImage.height}
    />
  </Card>
);

HeaderImage.propTypes = {
  heaerImage: PropTypes.shape({
    url: PropTypes.string,
    width: PropTypes.number,
    height: PropTypes.number
  }),
  subredditName: PropTypes.string
};

export default HeaderImage;
