const userQuery = `query User($name: String!, $color: VibrantColors, $after: String) {
  user(name: $name, after: $after) {
    media {
      id,
      name,
      title,
      createdISO,
      score,
      url,
      subreddit,
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
}`;

export default userQuery;
