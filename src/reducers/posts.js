import { ADD_POSTS } from '../constant';

const postReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_POSTS:
      if (JSON.stringify(state) === JSON.stringify(action.payload)) {
        return state;
      } else if (typeof (action.payload) === 'undefined') return state;
      return [...action.payload];
    default:
      return state;
  }
};
export default postReducer;
