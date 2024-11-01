import {deleteExpensePath} from "./paths";

export default async function deleteExpense(expenseId: string) {
    const url = deleteExpensePath();

    const response = await fetch(url, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify({expenseId: expenseId}),
    });

    if (!response.ok) {
      response.json().then(data => {
            console.error(data.message);
        });
    }


    return response.status;
}