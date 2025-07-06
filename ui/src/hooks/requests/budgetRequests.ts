import { IUpdateBudgetDto } from '@clients';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import useApi from './useApi.ts';
import { routes } from '../../routes/apiRoutes.ts';

export const useGetBudget = (): [() => Promise<AxiosResponse | undefined>] => {
  const { get } = useApi();
  const callback = useCallback(() => {
    return get(routes.budget.get);
  }, [get]);
  return [callback];
};

export const usePostModify = (): [
  (body: IUpdateBudgetDto[]) => Promise<AxiosResponse | undefined>,
] => {
  const { post } = useApi();
  const callback = useCallback(
    (body: IUpdateBudgetDto[]) => {
      return post(routes.budget.modify, body);
    },
    [post],
  );
  return [callback];
};
