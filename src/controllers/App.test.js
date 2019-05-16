import App from './App';
import AppModel from '../model/AppModel';

jest.mock('../model/AppModel');
beforeEach(() => {
  AppModel.mockClear();
});

it('Check if the App called the AppModel constuctor', () => {
  App.prototype.start();
  expect(AppModel).toHaveBeenCalled();
});
