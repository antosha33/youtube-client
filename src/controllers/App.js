/* eslint-disable no-unused-vars */
import AppView from '../view/AppView';
import AppModel from '../model/AppModel';

export default class App {
  constructor() {
    this.startQuestion = 'What do you want to find ?';
    this.state = {
      baseUrl: 'https://www.googleapis.com/youtube/v3/',
      // apiKey: 'AIzaSyBwvLzk6ZxqPOLGQwz3T_2WAXhBWzjKA_8',
      apiKey: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y',
    };
  }

  start() {
    this.questionBuild();
  }

  questionBuild() {
    const view = new AppView(this.startQuestion);
    const model = new AppModel(this.state);
    view.startRender();
    const input = document.getElementById('main-input');
    let question = '';
    let startTime = new Date().getTime();
    function getListOfVideos() {
      document.getElementById('wrapper').classList.add('wrapper-pseudo');
      async function get() {
        const nowTime = new Date().getTime();
        if (question !== '' && nowTime - startTime >= 2000) {
          const resultVideos = await model.getVideos('search', question);
          const commonResult = await model.getVideos('videos', question, resultVideos);
          await view.resultRender(commonResult);
          await document.getElementById('wrapper').classList.remove('wrapper-pseudo');
          await App.slider(question, model, view);
        }
      }
      setTimeout(get, 2000);
    }
    function getQuestion(e) {
      view.clearFlow();
      model.clearFetchResult();
      startTime = new Date().getTime();
      question = e.target.value;
      getListOfVideos();
    }
    input.addEventListener('input', getQuestion);
  }

  static slider(question, model, view) {
    const clips = document.getElementById('clips');
    const itemPerScreen = 4;
    let itemCount = 15;
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const page = document.getElementById('page');
    let x0 = null;
    let i = 0;
    let locked = false;
    clips.style.setProperty('--item-per-screen', itemPerScreen);
    clips.style.setProperty('--item-count', itemCount);
    function point(e) {
      x0 = e.clientX;
      clips.classList.toggle('smooth');
      locked = true;
    }
    function drag(e) {
      if (locked) {
        if (Math.abs(e.clientX - x0) < 400) {
          clips.style.setProperty('--tx', '0px');
          clips.style.setProperty('--tx', `${Math.round(e.clientX - x0)}px`);
          clips.classList.add('smooth');
        }
      }
    }
    async function getNext() {
      model.clearFetchResult();
      const resultVideos = await model.getVideos('search', question);
      const commonResult = await model.getVideos('videos', question, resultVideos);
      await view.addResults(commonResult);
      itemCount = clips.children.length;
      clips.style.setProperty('--item-count', itemCount);
    }
    function move(e) {
      if (locked) {
        const tx = clips.style;
        const diff = Math.sign(x0 - e.clientX);
        if (diff > 0) {
          clips.style.setProperty('--i', i += 1);
          page.innerHTML = i + 1;
          locked = false;
          if ((i + 1) * itemPerScreen >= itemCount - 5) {
            getNext();
          }
        } else if (i > 0 && diff < 0) {
          clips.style.setProperty('--i', i -= 1);
          page.innerHTML = i + 1;
          locked = false;
        }
        clips.classList.toggle('smooth');
        locked = false;
        clips.style.setProperty('--tx', '0px');
      }
    }
    function setNextI() {
      if (i + 1 < itemCount / itemPerScreen) {
        clips.style.setProperty('--i', i += 1);
        page.innerHTML = i + 1;
      }
      if ((i + 1) * itemPerScreen >= itemCount - 5) {
        getNext();
      }
    }
    function setPrevI() {
      if (i > 0) {
        clips.style.setProperty('--i', i -= 1);
        page.innerHTML = i + 1;
      }
    }
    function defaultTx() {
      locked = false;
      clips.style.setProperty('--tx', '0px');
    }
    clips.addEventListener('mousedown', point);
    clips.addEventListener('mouseup', move);
    clips.addEventListener('mousemove', drag);
    clips.addEventListener('mouseleave', defaultTx);
    next.addEventListener('click', setNextI);
    prev.addEventListener('click', setPrevI);
  }
}
