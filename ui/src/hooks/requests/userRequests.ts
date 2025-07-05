import { IUpdateUserDto } from '@clients';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import useApi from './useApi.ts';
import { routes } from '../../routes/apiRoutes.ts';

export const usePostUpdate = (): [
  (
    username: string,
    body: IUpdateUserDto,
  ) => Promise<AxiosResponse | undefined>,
] => {
  const { post } = useApi();
  const callback = useCallback(
    (username: string, body: IUpdateUserDto) => {
      return post(routes.user.update(username), body);
    },
    [post],
  );
  return [callback];
};

export const useGetUser = (): [
  (username: string) => Promise<AxiosResponse | undefined>,
] => {
  const { get } = useApi();
  const callback = useCallback(
    (username: string) => {
      return get(routes.user.get(username));
    },
    [get],
  );
  return [callback];
};

export const useDeleteUser = (): [
  (username: string) => Promise<AxiosResponse | undefined>,
] => {
  const { Delete } = useApi();
  const callback = useCallback(
    (username: string) => {
      return Delete(routes.user.delete(username));
    },
    [Delete],
  );
  return [callback];
};
