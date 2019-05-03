import './main.css';

export default class Appview {
  constructor(titles, startQuestion) {
    this.titles = titles;
    this.startQuestion = startQuestion;
  }

  startRender() {
    const wrapper = document.createElement('div');
    const search = document.createElement('div');
    const label = document.createElement('label');
    const content = document.createElement('input');
    const loadingLogo = document.createElement('div');
    loadingLogo.classList.add('loading-logo');
    wrapper.classList.add('wrapper');
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
}
