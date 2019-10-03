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
  let tempState = state;
  if (action.type === LOGOUT) {
    localStorage.clear();
    tempState = undefined;
  }
  return appReducer(tempState, action);
};

export default rootReducer;
