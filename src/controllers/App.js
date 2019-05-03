/* eslint-disable no-unused-vars */
import AppView from '../view/AppView';
import AppModel from '../model/AppModel';

export default class App {
  constructor() {
    this.startQuestion = 'What do you want to find ?';
    this.state = {
      baseUrl: 'https://www.googleapis.com/youtube/v3/',
      apiKey: 'AIzaSyBwvLzk6ZxqPOLGQwz3T_2WAXhBWzjKA_8',
    };
  }

  start() {
    const view = new AppView('', this.startQuestion);
    view.startRender();
    this.questionBuild();
  }

  questionBuild() {
    const model = new AppModel(this.state);
    const input = document.getElementById('main-input');
    let question = '';
    let startTime = new Date().getTime();
    function getListOfVideos() {
      function get() {
        const nowTime = new Date().getTime();
        if (question !== '' && nowTime - startTime >= 2000) model.getVideos(question);
      }
      setTimeout(get, 2000);
    }
    function getQuestion(e) {
      startTime = new Date().getTime();
      question = e.target.value;
      getListOfVideos();
    }
    input.addEventListener('input', getQuestion);
  }
}
