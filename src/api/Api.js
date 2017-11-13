import { Component } from 'react';
import PropTypes from 'prop-types';

const fetchSubreddit = name =>
  fetch('/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: JSON.stringify({
      query: `query Subreddit($name: String!) {
      subreddit(name: $name) {
        name,
        headerImage {
          url,
          width,
          height
        },
        headerIcon {
          url,
          width,
          height
        },
        listings {
          hot {
            domain,
            isVideo,
            swatches {
              vibrant,
              muted,
              darkVibrant,
              darkMuted,
              lightVibrant,
              lightMuted
            },
            id,
            title,
            created,
            score,
            url,
            preview {
              images {
                url,
                width,
                height
              }
            },
            author {
              name,
              posts{
                id,
                url,
                title
              }
            }
          }
        }
      }
    }`,
      variables: {
        name
      }
    })
  });

class Api extends Component {
  state = {
    isLoading: true,
    isError: false,
    error: {},
    subreddit: {}
  };

  static propTypes = {
    subredditName: PropTypes.string.isRequired,
    children: PropTypes.func.isRequired
  };

  loadSubreddit = async subredditName => {
    this.setState(
      {
        isLoading: true,
        isError: false,
        error: {},
        subreddit: {}
      },
      async () => {
        try {
          const response = await fetchSubreddit(subredditName);
          const json = await response.json();
          const subreddit = json.data.subreddit;
          this.setState({
            isLoading: false,
            isError: false,
            subreddit
          });
        } catch (error) {
          this.setState({
            isLoading: false,
            isError: true,
            error,
            subreddit: {}
          });
        }
      }
    );
  };

  componentDidMount() {
    this.loadSubreddit(this.props.subredditName);
  }

  componentWillReceiveProps(nextProps) {
    this.loadSubreddit(nextProps.subredditName);
  }

  render() {
    return this.props.children(this.state);
  }
}

export default Api;
