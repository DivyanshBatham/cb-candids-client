import { TOGGLE_SHARE_MENU } from '../constant';

const shareReducer = (state = {}, action) => {
  switch (action.type) {
    case TOGGLE_SHARE_MENU: {
      const tempState = state.showShareMenu
        ? {}
        : {
          ...state,
          showShareMenu: true,
          url: action.payload.url,
          title: action.payload.title,
        };
      return tempState;
    }
    default:
      return state;
  }
};
export default shareReducer;
