import AppModel from './AppModel';

describe('AppModel.getVideoItems', () => {
  const App = new AppModel();
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
