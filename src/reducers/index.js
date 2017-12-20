import { combineReducers } from 'redux';
import homePage from './homePage';
import detail from './detail';
import login from './login';

export default combineReducers({
    homePage,
    detail,
    login
});
