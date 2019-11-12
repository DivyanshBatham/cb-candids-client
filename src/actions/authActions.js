/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ADD_LOGIN_DATA } from '../constant';

export const addAuthDataToState = (data) => {
  const action = {
    type: ADD_LOGIN_DATA,
    payload: { ...data },
  };
  return action;
};
export const addAuthData = () => (dispatch) => {
  // TODO: Set intialstore using the data from localStorage.
  const username = localStorage.getItem('cb-username');
  axios({
    method: 'get',
    url: `https://calm-waters-47062.herokuapp.com/users/${username}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
    },
  }).then((res) => {
    if (res.data.success) {
      dispatch(addAuthDataToState(res.data.data.user));
    }
  });
};
