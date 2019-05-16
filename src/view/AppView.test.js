import AppView from './AppView';

describe('AppView.startRender && AppView.resultRender', () => {
  it('Should be rendered correctly', () => {
    const context1 = {
      startQuestion: 'What do you want to find ?',
    };
    const context = [
      {
        author: 'Author_1',
        description: 'description_1',
        id: 'id_1',
        image: 'image_1',
        title: 'title_1',
        uploadDate: 'uploadDate_1',
        view: 'view_1',
      },
      {
        author: 'Author_2',
        description: 'description_2',
        id: 'id_2',
        image: 'image_2',
        title: 'title_2',
        uploadDate: 'uploadDate_2',
        view: 'view_2',
      },
      {
        author: 'Author_3',
        description: 'description_3',
        id: 'id_3',
        image: 'image_3',
        title: 'title_3',
        uploadDate: 'uploadDate_3',
        view: 'view_3',
      },
      {
        author: 'Author_4',
        description: 'description_4',
        id: 'id_4',
        image: 'image_4',
        title: 'title_4',
        uploadDate: 'uploadDate_4',
        view: 'view_4',
      },
    ];
    AppView.prototype.startRender.call(context1);
    AppView.prototype.startRender(context);
    expect(document.body.innerHTML).toMatchSnapshot();
  });
});
