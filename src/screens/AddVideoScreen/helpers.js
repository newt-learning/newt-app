import _ from "lodash";

// Youtube URL parser which only does full and short links, among others.
// See: https://stackoverflow.com/questions/3452546/how-do-i-get-the-youtube-video-id-from-a-url
export function validateYoutubeUrl(url) {
  const regex = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/;
  const match = url.match(regex);

  // Get videoId from url if it exists
  const videoId = match && match[1].length === 11 ? match[1] : null;

  return videoId;
}

// Function that returns the highest quality thumbnail from YouTube API response,
// or null if it's empty
export function getBestThumbnail(thumbnails) {
  if (!thumbnails) {
    return null;
  }

  const options = ["maxres", "standard", "high", "medium", "default"];
  let bestOption = null;

  for (let i = 0; i < options.length; i++) {
    if (thumbnails[options[i]]) {
      bestOption = thumbnails[options[i]];
      break;
    }
  }

  return bestOption;
}

// Extract only relevant video information from result of Youtube API + add
// other content info like shelf and topics
export function extractAndAssembleVideoInfo(
  videoInfo,
  shelf,
  topics,
  startDate,
  finishDate
) {
  const {
    id,
    snippet: {
      title,
      description,
      channelTitle,
      thumbnails,
      channelId,
      publishedAt,
    },
  } = videoInfo;

  const bestThumbnail = getBestThumbnail(thumbnails);

  let data = {
    name: _.isString(title) ? title : null,
    description: _.isString(description) ? description : null,
    authors: _.isString(channelTitle) ? [channelTitle] : null,
    thumbnailUrl: bestThumbnail ? bestThumbnail.url : null,
    type: "video",
    shelf,
    topics,
    videoInfo: {
      source: "youtube",
      videoId: _.isString(id) ? id : null,
      title: _.isString(title) ? title : null,
      description: _.isString(description) ? description : null,
      channelId: _.isString(channelId) ? channelId : null,
      thumbnails: !_.isEmpty(thumbnails) ? thumbnails : null,
      datePublished: _.isString(publishedAt) ? publishedAt : null,
    },
  };

  // If the selected shelf is Currently Learning, set first date started as now
  if (shelf === "Currently Learning") {
    data.startFinishDates = [{ dateStarted: Date.now() }];
  }

  // If the selected shelf is Finished, add the dateCompleted field
  if (shelf === "Finished Learning") {
    data.startFinishDates = [
      { dateStarted: startDate, dateCompleted: finishDate },
    ];
  }

  return data;
}