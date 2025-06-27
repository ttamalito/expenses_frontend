import { fetchTotalEarnedEachMonthPath } from './paths';

export interface IFetchTotalEarnedEachMonthResponse {
  month: number;
  total: number;
}

export async function fetchTotalEarnedEachMonth(
  year: number,
): Promise<IFetchTotalEarnedEachMonthResponse[]> {
  const result: IFetchTotalEarnedEachMonthResponse[] = [];
  const url = fetchTotalEarnedEachMonthPath(year);
  const res = await fetch(url, {
    method: 'GET',
    credentials: 'include',
  });

  if (res.ok) {
    const data = await res.json();
    console.log('Total earned each month: ');
    for (let i = 0; i < data.length; i++) {
      console.log(data[i]);
      result.push(data[i]);
    }
    return result;
  }
  if (res.status === 400) {
    throw new Error('Invalid Request');
  }
  if (res.status === 401) {
    throw new Error('Unauthorized');
  }

  if (res.status === 500) {
    res.json().then((data) => {
      throw new Error(data.error + ': ' + data.message);
    });
  }
  return result;
}
