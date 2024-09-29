import {BACKEND_URL} from "../../constants";

export const modifyOneExpensePath = (id: string) => `${BACKEND_URL}/expenses/modify?id=${id}`;