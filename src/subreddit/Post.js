import React, { Component } from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";

const PostWrapper = glamorous.div(
  {
    border: "0.25rem solid #000",
    padding: "1.5rem",
    marginBottom: "2rem",
    ":first-child": {
      marginTop: "2rem"
    }
  },
  ({ imageColors }) => {
    if (imageColors) {
      return {
        backgroundColor: imageColors.vibrant,
        borderColor: imageColors.vibrantDark || imageColors.vibrant
      };
    } else {
      return {
        backgroundColor: "#000"
      };
    }
  }
);

const PostTitle = glamorous.h2(
  {
    margin: 0,
    marginBottom: "1rem"
  },
  ({ imageColors }) => {
    if (imageColors) {
      return {
        color: imageColors.mutedDark || imageColors.muted
      };
    } else {
      return {
        color: "#FFF"
      };
    }
  }
);

const PostContent = glamorous.div({
  display: "flex",
  padding: "1rem",
  alignItems: "center",
  flexDirection: "column"
});

const PostImage = glamorous.img(
  {
    maxWidth: "100%",
    maxHeight: "200vh"
  },
  ({ imageColors }) => {
    if (imageColors) {
      return {
        border: `0.25rem solid ${imageColors.vibrantLight ||
          imageColors.vibrantDark}`
      };
    }

    return {};
  }
);

class Post extends Component {
  static propTypes = {
    post: PropTypes.object.isRequired
  };

  render() {
    const { post } = this.props;
    let url;
    let isVideo;

    switch (post.domain) {
      case "gfycat.com":
        url =
          post.url.replace("https://gfycat.com/", "https://giant.gfycat.com/") +
          ".mp4";
        isVideo = true;
        break;
      case "i.imgur.com":
        isVideo = post.url.includes(".gifv");
        url = post.url;
        if (isVideo) {
          url = post.url.replace(".gifv", ".mp4");
        }
        break;
      default:
        url = post.url;
        isVideo = post.isVideo;
    }

    return (
      <PostWrapper imageColors={post.imageColors}>
        <PostContent>
          <PostTitle imageColors={post.imageColors}>{post.title}</PostTitle>
          {isVideo ? (
            <video src={url} autoPlay={false} controls loop muted />
          ) : (
            <PostImage
              src={url}
              alt={post.title}
              imageColors={post.imageColors}
            />
          )}
        </PostContent>
      </PostWrapper>
    );
  }
}

export default Post;
