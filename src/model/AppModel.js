export default class Model {
  constructor(state) {
    this.state = state;
  }

  urlBuild(question, endpoint) {
    const { baseUrl, apiKey } = this.state;
    const url = `${baseUrl}${endpoint}?key=${apiKey}&type=video&part=snippet&maxResults=15&q=${question}`;
    // eslint-disable-next-line no-console
    return url;
  }

  static getVideoItems(data) {
    console.log(data);
    const arr = [];
    data.items.forEach((it) => {
      arr.push({
        id: it.id.videoId,
        title: it.snippet.title,
        author: it.snippet.channelTitle,
        uploadDate: it.snippet.publishedAt,
        description: it.snippet.description,
        image: it.snippet.thumbnails.medium.url,
      });
    });
    console.log(arr);
  }

  async getVideos(question) {
    const response = await fetch(this.urlBuild(question, 'search'));
    const data = await response.json();
    return Model.getVideoItems(data);
  }
}
