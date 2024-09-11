import { BACKEND_URL } from "../../constants";

/**
 * Retrieves the total amount of money received in a specific year from the backend API.
 * The response is returned as a number.
 *
 * @param {number} year - The year for which the total earned is to be retrieved.
 * @returns {number} The total amount of money received in the year.
 */
export default async function fetchTotalEarnedInYear(year: number): Promise<number | undefined> {
  let totalEarned: number | undefined = undefined;
  const res = await fetch(`${BACKEND_URL}/income/total-earned?year=${year}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (res.ok) {
    const data = await res.json();
    totalEarned = data.total;
    console.log('Total earned: ' + totalEarned);
    return totalEarned;
  }
  if (res.status === 400) {
    throw new Error('Invalid Request');
  }
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (res.status === 500) {
    res.json().then(data => {
      throw new Error(data.error + ': ' + data.message);
    })
  }
  return totalEarned;
}