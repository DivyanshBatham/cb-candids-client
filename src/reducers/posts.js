import { ADD_POSTS, DELETE_POST } from '../constant';

const postReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_POSTS:
      if (JSON.stringify(state) === JSON.stringify(action.payload)) {
        return state;
      } else if (typeof (action.payload) === 'undefined') return state;
      return [...action.payload];

    case DELETE_POST: {
      const { postId } = action.payload;
      const postsAfterDeletedPost = state.filter(post => post._id !== postId);
      return postsAfterDeletedPost; }
    default:
      return state;
  }
};
export default postReducer;
