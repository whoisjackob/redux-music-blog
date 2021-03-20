import { combineReducers } from 'redux';
import postReducer from './postReducer';
import musicReducer from './musicReducer';

export default combineReducers({ posts: postReducer, songs: musicReducer });
