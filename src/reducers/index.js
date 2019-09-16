import { ADD_LOGIN_DATA } from '../constant';

const reducerFucntion = (state = {}, action) => {
  switch (action.type) {
    case ADD_LOGIN_DATA:
      console.log('from reducer addLoginData-->', action.payload);
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
export default reducerFucntion;
