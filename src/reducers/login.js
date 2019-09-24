import { ADD_LOGIN_DATA } from '../constant';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LOGIN_DATA:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default loginReducer;
