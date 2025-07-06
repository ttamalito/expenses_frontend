import { ICreateIncomeDto } from '@clients';
import { AxiosResponse } from 'axios';
import { useCallback } from 'react';
import useApi from './useApi.ts';
import { routes } from '../../routes/apiRoutes.ts';

export const usePostAdd = (): [
  (body: ICreateIncomeDto) => Promise<AxiosResponse | undefined>,
] => {
  const { post } = useApi();
  const callback = useCallback(
    (body: ICreateIncomeDto) => {
      return post(routes.incomes.add, body);
    },
    [post],
  );
  return [callback];
};

export const useDeleteIncome = (): [
  (id: number) => Promise<AxiosResponse | undefined>,
] => {
  const { Delete } = useApi();
  const callback = useCallback(
    (id: number) => {
      return Delete(routes.incomes.delete(id));
    },
    [Delete],
  );
  return [callback];
};

export const useGetIncome = (): [
  (id: number) => Promise<AxiosResponse | undefined>,
] => {
  const { get } = useApi();
  const callback = useCallback(
    (id: number) => {
      return get(routes.incomes.get(id));
    },
    [get],
  );
  return [callback];
};

export const useGetTotalEarnedYear = (): [
  (year: number) => Promise<AxiosResponse | undefined>,
] => {
  const { get } = useApi();
  const callback = useCallback(
    (year: number) => {
      const params = new URLSearchParams();
      params.append('year', year.toString());
      return get(routes.incomes.totalEarnedYear, params);
    },
    [get],
  );
  return [callback];
};

export const useGetTotalEarnedMonth = (): [
  (month: number, year: number) => Promise<AxiosResponse | undefined>,
] => {
  const { get } = useApi();
  const callback = useCallback(
    (month: number, year: number) => {
      const params = new URLSearchParams();
      params.append('month', month.toString());
      params.append('year', year.toString());
      return get(routes.incomes.totalEarnedMonth, params);
    },
    [get],
  );
  return [callback];
};

export const useGetEarnedYearMonthly = (): [
  (year: number) => Promise<AxiosResponse | undefined>,
] => {
  const { get } = useApi();
  const callback = useCallback(
    (year: number) => {
      const params = new URLSearchParams();
      params.append('year', year.toString());
      return get(routes.incomes.earnedYearMonthly, params);
    },
    [get],
  );
  return [callback];
};

export const useGetMonthlyIncomes = (): [
  (month: number, year: number) => Promise<AxiosResponse | undefined>,
] => {
  const { get } = useApi();
  const callback = useCallback(
    (month: number, year: number) => {
      return get(routes.incomes.monthly(month, year));
    },
    [get],
  );
  return [callback];
};

export const useGetYearlyIncomes = (): [
  (year: number) => Promise<AxiosResponse | undefined>,
] => {
  const { get } = useApi();
  const callback = useCallback(
    (year: number) => {
      return get(routes.incomes.yearly(year));
    },
    [get],
  );
  return [callback];
};
