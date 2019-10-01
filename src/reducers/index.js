import { combineReducers } from 'redux';
import loginReducer from './login';
import postReducer from './posts';
import shareReducer from './shareReducer';
import { LOGOUT } from '../constant';

const appReducer = combineReducers({
  user: loginReducer,
  posts: postReducer,
  share: shareReducer,
});

const rootReducer = (state, action) => {
  if (action.type === LOGOUT) {
    localStorage.clear();
    return undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
