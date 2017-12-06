const subredditQuery = `query Subreddit($name: String!, $color: VibrantColors, $after: String) {
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
    media {
      hot(after: $after) {
        id,
        name,
        title,
        createdISO,
        score,
        url,
        permalink,
        urlsInComments {
          title
          url
          score
          author
          isSubmitter
        }
        media {
          url
          height
          width
          isVideo
          id
          preview {
            colors {
              vibrant,
              vibrantDark,
              vibrantLight,
              muted,
              mutedDark,
              mutedLight,
              titleText(color: $color),
              bodyText(color: $color)
            },
            height
            width
            url
          }
        },
        author {
          name
        }
      }
    }
  }
}`;

export default subredditQuery;
