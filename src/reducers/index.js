import { combineReducers } from 'redux';
import loginReducer from './login';
import postReducer from './posts';

const rootReducer = combineReducers({
  user: loginReducer,
  posts: postReducer,

});

export default rootReducer;
