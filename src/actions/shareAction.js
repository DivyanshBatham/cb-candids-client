import { SHOW_SHARE_MENU, HIDE_SHARE_MENU } from '../constant';

export const showShareMenu = (title, url) => {
  const action = {
    type: SHOW_SHARE_MENU,
    payload: {
      title,
      url,
    },
  };
  return action;
};

export const hideShareMenu = () => {
  const action = {
    type: HIDE_SHARE_MENU,
  };
  return action;
};

