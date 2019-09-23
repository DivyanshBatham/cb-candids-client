import { ADD_POSTS } from '../constant';

const postReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_POSTS:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
export default postReducer;
