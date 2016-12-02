import {combineReducers} from 'redux';
import MusicReducer from './music_reducer';

const rootReducer = combineReducers({
  music: MusicReducer
});

export default rootReducer;
