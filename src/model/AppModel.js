export default class Model {
  constructor(state) {
    this.state = state;
    this.fetchResult = [];
    this.nextPageToken = null;
  }

  clearFetchResult() {
    this.fetchResult = [];
  }

  urlBuild(endpoint, question, resultVideos) {
    const optionSearch = {
      type: 'video',
      part: 'snippet',
      maxResults: '15',
      q: question,
    };
    const { baseUrl, apiKey } = this.state;
    let url = `${baseUrl}${endpoint}?key=${apiKey}`;
    if (endpoint === 'search') {
      Object.keys(optionSearch).forEach((key) => {
        url += `&${key}=${optionSearch[key]}`;
      });
      if (this.nextPageToken !== null) {
        url += `&pageToken=${this.nextPageToken}`;
      }
    } else if (endpoint === 'videos') {
      url = `${baseUrl}${endpoint}?key=${apiKey}&id=`;
      resultVideos.forEach((key) => {
        url += `${key.id},`;
      });
      url.slice(0, -1);
      url += '&part=snippet,statistics';
    }
    return url;
  }

  getVideoItems(data) {
    if (data.nextPageToken !== undefined) this.nextPageToken = data.nextPageToken;
    if (data.items[0].statistics === undefined) {
      data.items.forEach((it) => {
        this.fetchResult.push({
          id: it.id.videoId,
          title: it.snippet.title,
          author: it.snippet.channelTitle,
          uploadDate: it.snippet.publishedAt,
          image: it.snippet.thumbnails.medium.url,
        });
      });
    } else {
      const viewsArr = [];
      const description = [];
      data.items.forEach((it) => {
        viewsArr.push(it.statistics.viewCount);
        description.push(it.snippet.description);
      });
      for (let i = 0; i < this.fetchResult.length; i += 1) {
        this.fetchResult[i].view = viewsArr[i];
        this.fetchResult[i].description = description[i];
      }
    }
    return this.fetchResult;
  }

  async getVideos(endpoint, question, resultVideos) {
    try {
      const response = await fetch(this.urlBuild(endpoint, question, resultVideos));
      const data = await response.json();
      return this.getVideoItems(data);
    } catch (e) {
      return e;
    }
  }
}
