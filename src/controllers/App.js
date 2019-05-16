/* eslint-disable no-unused-vars */
import AppView from '../view/AppView';
import AppModel from '../model/AppModel';

export default class App {
  constructor() {
    this.startQuestion = 'What do you want to find ?';
    this.itemPerScreen = 4;
    this.state = {
      baseUrl: 'https://www.googleapis.com/youtube/v3/',
      apiKey: 'AIzaSyBwvLzk6ZxqPOLGQwz3T_2WAXhBWzjKA_8',
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
          view.resultRender(commonResult);
          document.getElementById('wrapper').classList.remove('wrapper-pseudo');
          App.slider(question, model, view);
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
    let itemPerScreen = 4;
    let itemCount = 15;
    const next = document.getElementById('next');
    const prev = document.getElementById('prev');
    const prevPrev = document.getElementById('prevPrev');
    const page = document.getElementById('page');
    let x0 = null;
    let i = 0;
    let locked = false;
    function screenSizeDetect() {
      const size = window.screen.width;
      if (size <= 1024 && size > 768) {
        itemPerScreen = 3;
      } else if (size <= 768 && size > 480) {
        itemPerScreen = 2;
      } else if (size <= 480) {
        itemPerScreen = 1;
      }
    }
    screenSizeDetect();
    function unify(e) {
      return e.changedTouches ? e.changedTouches[0] : e;
    }
    function point(e) {
      x0 = unify(e).clientX;
      clips.classList.toggle('smooth');
      locked = true;
    }
    function drag(e) {
      const isTitle = e.target.className;
      if (isTitle === 'clip-title') {
        locked = false;
      }
      if (locked) {
        if (Math.abs(unify(e).clientX - x0) < 600) {
          clips.style.setProperty('--tx', '0px');
          clips.style.setProperty('--tx', `${Math.round(unify(e).clientX - x0)}px`);
          clips.classList.add('smooth');
        }
      }
    }
    async function getNext() {
      model.clearFetchResult();
      const resultVideos = await model.getVideos('search', question);
      const commonResult = await model.getVideos('videos', question, resultVideos);
      view.addResults(commonResult);
      itemCount = clips.children.length;
      clips.style.setProperty('--item-count', itemCount);
    }
    function move(e) {
      if (locked) {
        const tx = clips.style;
        const diff = Math.sign(x0 - unify(e).clientX);
        if (diff > 0) {
          clips.style.setProperty('--i', i += 1);
          page.innerHTML = `<span>${i + 1}</span>`;
          locked = false;
          if (i > 1) {
            prevPrev.style.display = 'block';
          }
          if ((i + 1) * itemPerScreen >= itemCount - 5) {
            getNext();
          }
        } else if (i > 0 && diff < 0) {
          clips.style.setProperty('--i', i -= 1);
          page.innerHTML = `<span>${i + 1}</span>`;
          locked = false;
          if (i <= 1) {
            prevPrev.style.display = 'none';
          }
        }
        clips.classList.toggle('smooth');
        locked = false;
        clips.style.setProperty('--tx', '0px');
      }
    }
    function setNextI() {
      if (i + 1 < itemCount / itemPerScreen) {
        clips.style.setProperty('--i', i += 1);
        page.innerHTML = `<span>${i + 1}</span>`;
      }
      if ((i + 1) * itemPerScreen >= itemCount - 5) {
        getNext();
      }
      if (i > 1) {
        prevPrev.style.display = 'block';
      }
    }
    function setPrevI() {
      if (i > 0) {
        clips.style.setProperty('--i', i -= 1);
        page.innerHTML = `<span>${i + 1}</span>`;
      }
      if (i <= 1) {
        prevPrev.style.display = 'none';
      }
    }
    function defaultTx() {
      locked = false;
      clips.style.setProperty('--tx', '0px');
    }
    function setprevPrevI() {
      if (i > 0) {
        i -= 2;
        clips.style.setProperty('--i', i);
        page.innerHTML = `<span>${i + 1}</span>`;
      }
      if (i <= 1) {
        prevPrev.style.display = 'none';
      }
    }
    clips.addEventListener('mousedown', point);
    clips.addEventListener('touchstart', point);
    clips.addEventListener('mouseup', move);
    clips.addEventListener('touchend', move);
    clips.addEventListener('mousemove', drag);
    clips.addEventListener('touchmove', drag);
    clips.addEventListener('mouseleave', defaultTx);
    next.addEventListener('click', setNextI);
    prev.addEventListener('click', setPrevI);
    prevPrev.addEventListener('click', setprevPrevI);
  }
}
