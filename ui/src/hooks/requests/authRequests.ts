import { IUserLoginRequest } from '@clients';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import useApi from './useApi.ts';
import { routes } from '../../routes/apiRoutes.ts';

export const usePostLogin = (): [
  (body: IUserLoginRequest) => Promise<AxiosResponse | undefined>,
] => {
  const { postLogin } = useApi();
  const callback = useCallback(
    (body: IUserLoginRequest) => {
      return postLogin(routes.Account.login, body);
    },
    [postLogin],
  );
  return [callback];
};
