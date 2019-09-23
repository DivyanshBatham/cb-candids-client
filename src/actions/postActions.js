/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ADD_POSTS, DELETE_POST } from '../constant';

const addPostsToState = (posts) => {
  const action = {
    type: ADD_POSTS,
    payload: posts,
  };
  return action;
};


export const fetchAllPosts = () => (dispatch) => {
  axios({
    method: 'get',
    url: 'https://calm-waters-47062.herokuapp.com/posts',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
    },
  }).then((res) => {
    if (res.data.success) {
      dispatch(addPostsToState(res.data.data.posts));
    }
  }).catch(err => console.log(err));
};

const deletePostFromStore = (postId) => {
  const action = {
    type: DELETE_POST,
    payload: {
      postId,
    },
  };
  return action;
};

export const deletePost = postId => (dispatch) => {
  axios({
    method: 'delete',
    url: `https://calm-waters-47062.herokuapp.com/posts/${postId}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
    },
  }).then((res) => {
    if (res.data.success) {
      dispatch(deletePostFromStore(postId));
    }
  }).catch(err => console.log(err));
};

