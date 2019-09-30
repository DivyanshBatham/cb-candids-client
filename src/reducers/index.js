import { combineReducers } from 'redux';
import loginReducer from './login';
import postReducer from './posts';
import shareReducer from './shareReducer';

const rootReducer = combineReducers({
  user: loginReducer,
  posts: postReducer,
  share: shareReducer,
});

export default rootReducer;
