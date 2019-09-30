import { SHOW_SHARE_MENU, HIDE_SHARE_MENU } from '../constant';

const shareReducer = (state = {}, action) => {
  switch (action.type) {
    case SHOW_SHARE_MENU:
      return {
        ...state, showShareMenu: true, url: action.payload.url, title: action.payload.title,
      };
    case HIDE_SHARE_MENU: {
      return {};
    }
    default:
      return state;
  }
};
export default shareReducer;
