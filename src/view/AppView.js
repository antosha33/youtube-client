import './main.css';

export default class Appview {
  constructor(startQuestion) {
    this.startQuestion = startQuestion;
    this.result = [];
    this.test = [
      {
        author: 'PETERTEACH',
        description: 'A quick review of the kinds of things you can crate using JavaScript.',
        id: '-zI8RgGW8uw',
        image: 'https://i.ytimg.com/vi/-zI8RgGW8uw/mqdefault.jpg',
        title: 'Getting Started With Cool JavaScript APIs',
        uploadDate: '2016-10-18T22:37:19.000Z',
        view: '20036',
      },
      {
        author: 'Traversy Media',
        description: 'In this video we will create some animated font-awesome effects using vanilla JavaScript setTimeout and setInterval function. This is a simple project but I ...',
        id: 'XP-MRCUPZao',
        image: 'https://i.ytimg.com/vi/XP-MRCUPZao/mqdefault.jpg',
        title: 'Animate Your Font Awesome Icons With JavaScript',
        uploadDate: '2017-07-25T10:07:58.000Z',
        view: '65451',
      },
      {
        author: 'Red Stapler',
        description: 'In this video, we\'ll show you the best upcoming and trending javascript library and framework in 2018 that you should not miss. Source: ...',
        id: 'ephpPaY5LKk',
        image: 'https://i.ytimg.com/vi/ephpPaY5LKk/mqdefault.jpg',
        title: '7 Trending Javascript Library in 2018',
        uploadDate: '2018-03-19T16:40:45.000Z',
        view: '61714',
      },
      {
        author: 'Chris DeLeon of Gamkedo',
        description: 'Support on Patreon: https://www.patreon.com/gamkedo Try my free course: http://code-your-first-game.com (or full URL is ...',
        id: 'xGmXxpIj6vs',
        image: 'https://i.ytimg.com/vi/xGmXxpIj6vs/mqdefault.jpg',
        title: 'Coding &quot;Snake&quot; in 4 min 30 sec (plain browser JavaScript)',
        uploadDate: '2017-05-05T20:29:35.000Z',
        view: '4857750',
      },
      {
        author: 'PETERTEACH',
        description: 'A quick review of the kinds of things you can crate using JavaScript.',
        id: '-zI8RgGW8uw',
        image: 'https://i.ytimg.com/vi/-zI8RgGW8uw/mqdefault.jpg',
        title: 'Getting Started With Cool JavaScript APIs',
        uploadDate: '2016-10-18T22:37:19.000Z',
        view: '20036',
      },
      {
        author: 'Traversy Media',
        description: 'In this video we will create some animated font-awesome effects using vanilla JavaScript setTimeout and setInterval function. This is a simple project but I ...',
        id: 'XP-MRCUPZao',
        image: 'https://i.ytimg.com/vi/XP-MRCUPZao/mqdefault.jpg',
        title: 'Animate Your Font Awesome Icons With JavaScript',
        uploadDate: '2017-07-25T10:07:58.000Z',
        view: '65451',
      },
      {
        author: 'Red Stapler',
        description: 'In this video, we\'ll show you the best upcoming and trending javascript library and framework in 2018 that you should not miss. Source: ...',
        id: 'ephpPaY5LKk',
        image: 'https://i.ytimg.com/vi/ephpPaY5LKk/mqdefault.jpg',
        title: '7 Trending Javascript Library in 2018',
        uploadDate: '2018-03-19T16:40:45.000Z',
        view: '61714',
      },
      {
        author: 'Chris DeLeon of Gamkedo',
        description: 'Support on Patreon: https://www.patreon.com/gamkedo Try my free course: http://code-your-first-game.com (or full URL is ...',
        id: 'xGmXxpIj6vs',
        image: 'https://i.ytimg.com/vi/xGmXxpIj6vs/mqdefault.jpg',
        title: 'Coding &quot;Snake&quot; in 4 min 30 sec (plain browser JavaScript)',
        uploadDate: '2017-05-05T20:29:35.000Z',
        view: '4857750',
      },
    ];
  }

  startRender() {
    const wrapper = document.createElement('div');
    const search = document.createElement('div');
    const label = document.createElement('label');
    const content = document.createElement('input');
    const loadingLogo = document.createElement('div');
    loadingLogo.classList.add('loading-logo');
    wrapper.classList.add('wrapper');
    wrapper.setAttribute('id', 'wrapper');
    search.classList.add('search-wrapper');
    label.appendChild(content);
    content.setAttribute('placeholder', this.startQuestion);
    content.setAttribute('name', 'main-search');
    content.setAttribute('id', 'main-input');
    search.appendChild(label);
    wrapper.appendChild(search);
    wrapper.appendChild(loadingLogo);
    document.body.appendChild(wrapper);
  }

  resultRender(data) {
    this.clearFlow();
    if (document.getElementById('clips')) document.getElementById('clips').remove();
    this.result = data;
    const ul = document.createElement('ul');
    ul.classList.add('clip-list');
    ul.setAttribute('id', 'clips');
    ul.innerHTML = this.result.map(item => `<li>
      <div class='item-wrapper'>
        <img class='clip-logo' src='${item.image}'>
        <a href='https://www.youtube.com/watch?v=${item.id}' target='_blank'><div class='clip-title'>${item.title}</div></a>
        <div class='clip-about'>
          <div class='clip-author'>${item.author}</div>
          <div class='clip-date'>${item.uploadDate.slice(0, -14)}</div>
          <div class='clip-views'>${item.view}</div>
          <div class='clip-description'>${item.description}</div>
        </div>
      </div>
    </li>
    `).join('');
    document.getElementById('wrapper').appendChild(ul);
    const navbar = document.createElement('div');
    navbar.classList.add('navbar');
    navbar.setAttribute('id', 'navbar');
    navbar.innerHTML = '<div class="prev" id="prev"></div><div class="page" id="page"><span>1</span></div><div class="next" id="next"</div>';
    document.getElementById('wrapper').appendChild(navbar);
  }

  addResults(data) {
    this.result = data;
    const clips = document.getElementById('clips');
    const liArray = this.result.map(item => `
      <div class='item-wrapper'>
      <img class='clip-logo' src='${item.image}'>
      <a href='https://www.youtube.com/watch?v=${item.id}' target='_blank'><div class='clip-title'>${item.title}</div></a>
        <div class='clip-about'>
        <div class='clip-author'>${item.author}</div>
        <div class='clip-date'>${item.uploadDate.slice(0, -14)}</div>
        <div class='clip-views'>${item.view}</div>
        <div class='clip-description'>${item.description}</div>
        </div>
      </div>`);
    liArray.forEach((it) => {
      const li = document.createElement('li');
      li.innerHTML = it;
      clips.appendChild(li);
    });
  }

  clearFlow() {
    this.result = [];
    if (document.getElementById('clips')) document.getElementById('clips').remove();
    if (document.getElementById('navbar')) document.getElementById('navbar').remove();
  }
}
