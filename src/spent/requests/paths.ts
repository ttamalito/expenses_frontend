import {BACKEND_URL} from "../../constants";

export const fetchTotalEarnedInYearPath = (year: number) => `${BACKEND_URL}/income/total-earned?year=${year}`;

export const fetchExpensesOfATypeForAYearPath = (year: number, type: string) => `${BACKEND_URL}/expenses/single-type?year=${year}&type=${type}`;

export const fetchTotalSpentInYearPath = (year: number) => `${BACKEND_URL}/expenses/total-spent?year=${year}`;

export const fetchExpensesOfATypeForAMonthPath = (year: string, month: string ) => `${BACKEND_URL}/expenses/single-type/${month}/${year}`;