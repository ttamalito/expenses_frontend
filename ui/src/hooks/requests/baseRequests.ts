import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import useApi from './useApi.ts';
import { routes } from '../../routes/apiRoutes.ts';

export const useGetPing = (): [() => Promise<AxiosResponse | undefined>] => {
  const { get } = useApi();
  const callback = useCallback(() => {
    return get(routes.base.ping);
  }, [get]);
  return [callback];
};

export const useGetPingNot = (): [() => Promise<AxiosResponse | undefined>] => {
  const { get } = useApi();
  const callback = useCallback(() => {
    return get(routes.base.pingNot);
  }, [get]);
  return [callback];
};
