/* eslint-disable no-unused-vars */
import AppView from '../view/AppView';
import AppModel from '../model/AppModel';

export default class App {
  constructor() {
    this.startQuestion = 'What do you want to find ?';
    this.state = {
      baseUrl: 'https://www.googleapis.com/youtube/v3/',
      apiKey: 'AIzaSyBwvLzk6ZxqPOLGQwz3T_2WAXhBWzjKA_8',
      // apiKey: 'AIzaSyCTWC75i70moJLzyNh3tt4jzCljZcRkU8Y',
    };
  }

  start() {
    this.questionBuild();
  }

  questionBuild() {
    const model = new AppModel(this.state);
    const view = new AppView(this.startQuestion);
    view.startRender();
    // view.resultRender();

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
          await App.slider();
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

  static slider() {
    const clips = document.getElementById('clips');
    const items = clips.children.length;
    const itemPerScreen = 4;
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const page = document.getElementById('page');
    let x0 = null;
    let i = 0;
    let locked = false;
    clips.style.setProperty('--item-per-screen', itemPerScreen);
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
    function move(e) {
      if (locked) {
        const tx = clips.style;
        const diff = Math.sign(x0 - e.clientX);
        if (diff > 0) {
          clips.style.setProperty('--i', i += 1);
          page.innerHTML = i + 1;
          locked = false;
        } else if (i > 0) {
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
      if (i + 1 < items / itemPerScreen) {
        clips.style.setProperty('--i', i += 1);
        page.innerHTML = i + 1;
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
