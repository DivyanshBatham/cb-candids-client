import { ADD_LOGIN_DATA } from '../constant';

export const addLoginData = data => {
    console.log(data);
  const action = {
    type: ADD_LOGIN_DATA,
    payload: { ...data }
  };
  return action;
};
