import { ADD_POSTS, DELETE_POST, UPDATE_NEW_POSTS, NEW_POSTS } from '../constant';

const initialState = {
  posts: [],
  newPosts: [],
  newDataAvailable: false,
};
const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POSTS: {
      return { ...state, posts: [...action.payload] };
      // TODO: Add the field new Data available
    }

    case NEW_POSTS: {
      return { ...state, newPosts: action.payload, newDataAvailable: true };
    }

    case UPDATE_NEW_POSTS: {
      const newPostsData = state.newPosts;
      return { posts: newPostsData, newPosts: [], newDataAvailable: false };
    }

    case DELETE_POST: {
      const { postId } = action.payload;
      const postsAfterDeletedPost = state.posts.filter(post => post._id !== postId);
      return { ...state, posts: postsAfterDeletedPost };
    }
    default:
      return state;
  }
};
export default postReducer;
