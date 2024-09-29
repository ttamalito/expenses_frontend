import {BACKEND_URL} from '../../constants';

export const retrieveBudgetForAYear = (year: number) => {
    return `${BACKEND_URL}/budget/${year}`;
}

const modifyBudgetForAYear = (year: number) => {
    return `${BACKEND_URL}/budget/modify/${year}`;
}