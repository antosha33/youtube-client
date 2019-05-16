import './main.css';

export default class Appview {
  constructor(startQuestion) {
    this.startQuestion = startQuestion;
    this.result = [];
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
    navbar.innerHTML = '<div class="prevPrev" id="prevPrev"></div><div class="prev" id="prev"></div><div class="page" id="page"><span>1</span></div><div class="next" id="next"</div>';
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
