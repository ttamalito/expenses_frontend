import { ICreateUserDto, IUserLoginRequest } from '@clients';
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
      return postLogin(routes.auth.login, body);
    },
    [postLogin],
  );
  return [callback];
};

export const usePostSignup = (): [
  (body: ICreateUserDto) => Promise<AxiosResponse | undefined>,
] => {
  const { post } = useApi();
  const callback = useCallback(
    (body: ICreateUserDto) => {
      return post(routes.auth.signup, body);
    },
    [post],
  );
  return [callback];
};

export const useGetPing = (): [() => Promise<AxiosResponse | undefined>] => {
  const { get } = useApi();
  const callback = useCallback(() => {
    return get(routes.auth.ping);
  }, [get]);
  return [callback];
};

export const usePostPing = (): [
  (body: string) => Promise<AxiosResponse | undefined>,
] => {
  const { post } = useApi();
  const callback = useCallback(
    (body: string) => {
      return post(routes.auth.pingPost, body);
    },
    [post],
  );
  return [callback];
};

export const usePostPingNot = (): [
  () => Promise<AxiosResponse | undefined>,
] => {
  const { post } = useApi();
  const callback = useCallback(() => {
    return post(routes.auth.pingNot, {});
  }, [post]);
  return [callback];
};

export const useGetLoggedIn = (): [
  () => Promise<AxiosResponse | undefined>,
] => {
  const { get } = useApi();
  const callback = useCallback(() => {
    return get(routes.auth.loggedIn);
  }, [get]);
  return [callback];
};

export const usePostLogout = (): [() => Promise<AxiosResponse | undefined>] => {
  const { post } = useApi();
  const callback = useCallback(() => {
    return post(routes.auth.logout, {});
  }, [post]);
  return [callback];
};
