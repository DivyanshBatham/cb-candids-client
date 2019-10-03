import { LOGOUT } from '../constant';

export const logout = () => {
  const action = {
    type: LOGOUT,
  };
  return action;
};
