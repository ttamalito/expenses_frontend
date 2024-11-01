import {BACKEND_URL} from "../../constants";

export const fetchTotalEarnedInYearPath = (year: number) => `${BACKEND_URL}/income/total-earned?year=${year}`;

export const fetchExpensesOfATypeForAYearPath = (year: number, type: string) => `${BACKEND_URL}/expenses/single-type?year=${year}&type=${type}`;

export const fetchTotalSpentInYearPath = (year: number) => `${BACKEND_URL}/expenses/total-spent?year=${year}`;

export const fetchExpensesOfATypeForAMonthPath = (year: string, month: string ) => `${BACKEND_URL}/expenses/single-type/${month}/${year}`;

export const fetchAllExpensesForAMonthPath = (year: string, month: string ) => `${BACKEND_URL}/expenses/monthly/${month}/${year}`;

export const fetchAllExpensesForAYearPath = (year: string) => `${BACKEND_URL}/expenses/yearly/${year}`;

/**
 * Fetch the total spent in a month
 * use type === 'all' to get total spent in a month
 * otherwise use the type of expense
 * @param year
 * @param month
 * @param type
 */
export const fetchTotalSpentInMonthPath = (year: number, month: number, type: string) => `${BACKEND_URL}/expenses/total-spent/monthly?month=${month}&year=${year}&type=${type}`;

export const deleteExpensePath = () => `${BACKEND_URL}/expenses/delete`;