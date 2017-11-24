import React, { Component } from 'react';

class ImageNavigation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: (props.posts && props.posts[0] && props.posts[0].id) || '',
      postIds: props.posts.map(post => post.id),
      postPositions: [],
      disableScroll: false
    };
  }

  scrollIntoView = id => {
    const domNode = document.getElementById(id);
    if (domNode) {
      // disable scroll
      this.setState(
        {
          disableScroll: true
        },
        () => {
          // scroll while disable scroll is true
          domNode.scrollIntoView();
          // make sure this runs after the node has scrolled into view
          setTimeout(() => {
            this.setState({
              disableScroll: false
            });
          });
        }
      );
    }
  };

  goUp = () => {
    const posts = this.state.postIds;
    const previousIndex = posts.indexOf(this.state.selected) - 1;
    this.setState(
      previousState => ({
        selected: previousState.previous
          ? previousState.previous
          : posts[previousIndex < 0 ? posts.length - 1 : previousIndex],
        previous: undefined,
        next: undefined
      }),
      () => {
        this.scrollIntoView(this.state.selected);
      }
    );
  };

  goDown = () => {
    const posts = this.state.postIds;
    const nextIndex = posts.indexOf(this.state.selected) + 1;
    this.setState(
      previousState => ({
        selected: previousState.next
          ? previousState.next
          : posts[nextIndex >= posts.length ? 0 : nextIndex],
        previous: undefined,
        next: undefined
      }),
      () => {
        this.scrollIntoView(this.state.selected);
      }
    );
  };
  goRight = () => {
    console.log('right');
  };
  goLeft = () => {
    console.log('left');
  };

  handleScrollEvent = event => {
    // do not scroll when scroll is disabled
    if (this.state.disableScroll) {
      return;
    }

    // find the post that is currently viewed
    // a post is no longer in view when the window.scrollY is greather than the lower edge
    const post = this.state.postPositions.find(
      post =>
        window.scrollY > post.top && window.scrollY < post.top + post.height
    );

    if (post) {
      const posts = this.state.postPositions.map(post => post.id);
      const currentIndex = posts.indexOf(post.id);
      const nextIndex =
        currentIndex + 1 === posts.length ? currentIndex : currentIndex + 1;

      // use previous and next instead of selected
      // previous is always the one in view and next the following post
      this.setState({
        previous: post.id,
        next: posts[nextIndex]
      });
    }
  };

  shouldComponentUpdate(nextState, nextProps) {
    return false;
  }

  componentDidMount() {
    document.addEventListener('scroll', this.handleScrollEvent);

    this.setState({
      postPositions: this.props.posts.map(post => {
        const rect = document.getElementById(post.id).getBoundingClientRect();
        return {
          id: post.id,
          top: rect.top,
          height: rect.height
        };
      })
    });
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScrollEvent);
  }

  render() {
    return (
      <div>
        {this.props.children(this.goUp, this.goDown, this.goLeft, this.goRight)}
      </div>
    );
  }
}

export default ImageNavigation;
