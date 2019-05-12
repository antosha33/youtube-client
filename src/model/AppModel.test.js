import AppModel from './AppModel';

const state = {
  baseUrl: 'https://www.googleapis.com/youtube/v3/',
  apiKey: 'AIzaSyBwvLzk6ZxqPOLGQwz3T_2WAXhBWzjKA_8',
};
const App = new AppModel(state);

describe('AppModel.getVideoItems', () => {
  const data = {
    items: [
      {
        id: {
          videoId: 'id_1',
        },
        snippet: {
          channelTitle: 'channelTitile_1',
          publishedAt: 'publishedAt_1',
          title: 'title_1',
          thumbnails: {
            medium: {
              url: 'url_1',
            },
          },
        },
      },
      {
        id: {
          videoId: 'id_2',
        },
        snippet: {
          channelTitle: 'channelTitile_2',
          publishedAt: 'publishedAt_2',
          title: 'title_2',
          thumbnails: {
            medium: {
              url: 'url_2',
            },
          },
        },
      },
      {
        id: {
          videoId: 'id_3',
        },
        snippet: {
          channelTitle: 'channelTitile_3',
          publishedAt: 'publishedAt_3',
          title: 'title_3',
          thumbnails: {
            medium: {
              url: 'url_3',
            },
          },
        },
      },
    ],
  };
  const dataViews = {
    items: [
      {
        snippet: {
          description: 'description_1',
        },
        statistics: {
          viewCount: 'viewCount_1',
        },
      },
      {
        snippet: {
          description: 'description_2',
        },
        statistics: {
          viewCount: 'viewCount_2',
        },
      },
      {
        snippet: {
          description: 'description_3',
        },
        statistics: {
          viewCount: 'viewCount_3',
        },
      },
    ],
  };
  App.getVideoItems(data);
  const result = App.getVideoItems(dataViews);
  it('Should return an array of objects that contains certain keys and values exepct views and descriptions', () => {
    expect(result).toEqual(
      [
        {
          author: 'channelTitile_1',
          id: 'id_1',
          image: 'url_1',
          title: 'title_1',
          uploadDate: 'publishedAt_1',
          description: 'description_1',
          view: 'viewCount_1',
        },
        {
          author: 'channelTitile_2',
          id: 'id_2',
          image: 'url_2',
          title: 'title_2',
          uploadDate: 'publishedAt_2',
          description: 'description_2',
          view: 'viewCount_2',
        },
        {
          author: 'channelTitile_3',
          id: 'id_3',
          image: 'url_3',
          title: 'title_3',
          uploadDate: 'publishedAt_3',
          description: 'description_3',
          view: 'viewCount_3',
        },
      ],
    );
  });
});

describe('AppModel.urlBuild', () => {
  const result = App.urlBuild('search', 'test_question');
  it('Should return a valid url for search request', () => {
    expect(result).toBe('https://www.googleapis.com/youtube/v3/search?key=AIzaSyBwvLzk6ZxqPOLGQwz3T_2WAXhBWzjKA_8&type=video&part=snippet&maxResults=15&q=test_question');
  });
  const resultVideos = [
    { id: 'v_ubFrzulMc' },
    { id: 'TOl7w_nzud0' },
    { id: 'em7vEYnBV9s' },
    { id: 'Hnus0f3NlUw' },
    { id: '8OLvVZ6PjKg' },
    { id: 'gCv-uv2-PjY' },
    { id: '-WXQldd4Wos' },
    { id: 'SLFPRDoQ28s' },
    { id: 'K_YPF95JJ98' },
    { id: 'CE_GdbAddlk' },
    { id: 'KvAbxY7uqzk' },
    { id: 'aXI8DpSIGZ4' },
    { id: '_GGzFePW7i8' },
    { id: '0XexwKTxfHk' },
    { id: 'XSohXHylOn8' },
  ];
  const result2 = App.urlBuild('videos', 'test_question', resultVideos);
  it('Should return a valid url for videos request', () => {
    expect(result2).toBe('https://www.googleapis.com/youtube/v3/videos?key=AIzaSyBwvLzk6ZxqPOLGQwz3T_2WAXhBWzjKA_8&id=v_ubFrzulMc,TOl7w_nzud0,em7vEYnBV9s,Hnus0f3NlUw,8OLvVZ6PjKg,gCv-uv2-PjY,-WXQldd4Wos,SLFPRDoQ28s,K_YPF95JJ98,CE_GdbAddlk,KvAbxY7uqzk,aXI8DpSIGZ4,_GGzFePW7i8,0XexwKTxfHk,XSohXHylOn8,&part=snippet,statistics');
  });
});

describe('AppModel.getVideos', () => {
  it('Should be an instance of Promise', () => {
    const result = App.getVideos('search', 'rolling scopes school');
    expect(result).toBeInstanceOf(Promise);
  });
});

describe('AppModel.clearFetchResult', () => {
  App.getVideos('search', 'rolling scopes school');
  it('Should clear fetchResult', () => {
    App.clearFetchResult();
    expect(App.fetchResult).toEqual([]);
  });
});
