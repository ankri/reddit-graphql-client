import React, { Component } from "react";
import glamorous from "glamorous";
import * as glamor from "glamor";
import Api from "./api/Api";
import Subreddit from "./subreddit/Subreddit";

const heartBeatAnimation = glamor.css.keyframes({
  "0%": {
    transform: `scale( .75 )`
  },
  "20%": {
    transform: `scale( 1 )`
  },
  "40%": {
    transform: `scale( .75 )`
  },
  "60%": {
    transform: `scale( 1 )`
  },
  "80%": {
    transform: `scale( .75 )`
  },
  "100%": {
    transform: `scale( .75 )`
  }
});

const Loading = glamorous.div({
  display: "flex",
  height: "85vh",
  justifyContent: "center",
  alignItems: "center",
  width: "100vw",
  animation: `${heartBeatAnimation} 2s infinite`
});

const Error = glamorous.div({
  display: "flex",
  height: "85vh",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  width: "100vw"
});

class App extends Component {
  state = {
    subredditName: "pics"
  };

  changeSubreddit = subredditName => {
    this.setState({
      subredditName
    });
  };

  render() {
    return (
      <Api subredditName={this.state.subredditName}>
        {({ isError, isLoading, subreddit, error }) => {
          if (isLoading) {
            return (
              <Loading>
                <h1>Loading</h1>
              </Loading>
            );
          } else if (isError) {
            console.log(error);
            return (
              <Error>
                <h1>Error</h1>
                <p>{error.toString()}</p>
              </Error>
            );
          } else {
            return (
              <Subreddit
                subreddit={subreddit}
                changeSubreddit={this.changeSubreddit}
              />
            );
          }
        }}
      </Api>
    );
  }
}

export default App;
