/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { ADD_POSTS, DELETE_POST, NEW_POSTS, UPDATE_NEW_POSTS } from '../constant';

export const fetchAllPosts = () => (dispatch, getState) => {
  axios({
    method: 'get',
    url: 'https://calm-waters-47062.herokuapp.com/posts',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('cb-token')}`,
    },
  }).then((res) => {
    if (res.data.success) {
      const newPosts = res.data.data.posts;
      const currentPosts = getState().posts.posts;
      if (currentPosts.length === 0) {
        dispatch({
          type: ADD_POSTS,
          payload: newPosts,
        });
      } else if (JSON.stringify(newPosts) !== JSON.stringify(currentPosts)) {
        dispatch({
          type: NEW_POSTS,
          payload: newPosts,
        });
      }
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

export const updateNewPostInState = () => {
  const action = {
    type: UPDATE_NEW_POSTS,
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

