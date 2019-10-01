import { TOGGLE_SHARE_MENU } from '../constant';

export const toggleShareMenu = (title = null, url = null) => {
  const action = {
    type: TOGGLE_SHARE_MENU,
    payload: {
      title,
      url,
    },
  };
  return action;
};
