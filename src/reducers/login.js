import { ADD_LOGIN_DATA } from '../constant';

const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_LOGIN_DATA:
      console.log('action in login-->', action.payload);
      return { ...state, ...action.payload };
      break;
    default:
      return state;
  }
};
export default loginReducer;
