import { combineReducers } from 'redux';
import homePage from './homePage';
import detail from './detail';

export default combineReducers({
    homePage,
    detail
});
