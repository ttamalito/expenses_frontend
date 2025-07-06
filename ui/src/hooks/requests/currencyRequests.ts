import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import useApi from './useApi.ts';
import { routes } from '../../routes/apiRoutes.ts';
import { ICreateCurrencyDto } from '@clients';

export const useGetAllCurrencies = (): [
  () => Promise<AxiosResponse | undefined>,
] => {
  const { get } = useApi();
  const callback = useCallback(() => {
    return get(routes.currency.all);
  }, [get]);
  return [callback];
};

export const useGetCurrency = (): [
  (currencyId: number) => Promise<AxiosResponse | undefined>,
] => {
  const { get } = useApi();
  const callback = useCallback(
    (currencyId: number) => {
      return get(routes.currency.get(currencyId));
    },
    [get],
  );
  return [callback];
};

export const useCreateCurrency = (): [
  (body: ICreateCurrencyDto) => Promise<AxiosResponse | undefined>,
] => {
  const { post } = useApi();
  const callback = useCallback(
    (body: ICreateCurrencyDto) => {
      return post(routes.currency.create, body);
    },
    [post],
  );
  return [callback];
};

export const useDeleteCurrency = (): [
  (currencyId: number) => Promise<AxiosResponse | undefined>,
] => {
  const { Delete } = useApi();
  const callback = useCallback(
    (currencyId: number) => {
      return Delete(routes.currency.delete(currencyId));
    },
    [Delete],
  );
  return [callback];
};
