import { BACKEND_URL } from '../../constants';

export const fetchUserDataPath = (username: string) => {
  return `${BACKEND_URL}/user/${username}`;
};
