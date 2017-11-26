import React from 'react';
import glamorous from 'glamorous';
import * as glamor from 'glamor';

const heartBeatAnimation = glamor.css.keyframes({
  '0%': {
    transform: `scale( .75 )`
  },
  '20%': {
    transform: `scale( 1 )`
  },
  '40%': {
    transform: `scale( .75 )`
  },
  '60%': {
    transform: `scale( 1 )`
  },
  '80%': {
    transform: `scale( .75 )`
  },
  '100%': {
    transform: `scale( .75 )`
  }
});

const Wrapper = glamorous.div({
  display: 'flex',
  height: '85vh',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  animation: `${heartBeatAnimation} 2s infinite`
});

const Loading = () => (
  <Wrapper>
    <h1>Loading</h1>
  </Wrapper>
);

export default Loading;
