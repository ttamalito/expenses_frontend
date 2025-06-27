import { fetchUserDataPath } from './paths';
import getAccessTokenHeader from '../../utils/getAccessTokenHeader';

export default async function fetchUserData(username: string) {
  const accessTokenHeader = getAccessTokenHeader();

  const response = await fetch(fetchUserDataPath(username), {
    method: 'GET',
    headers: {
      Authorization: accessTokenHeader,
    },
  });

  if (!response.ok) {
    throw new Error('User data could not be retrieved: ' + response.status);
  }

  const data = await response.json();
  //data = JSON.parse(data);
  console.log(typeof data);
  console.log('Data of the user' + data);
  console.log(data.id);
  const userData: User = {
    id: data.id,
    username: data.username,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    profilePicture: data.profilePicture,
    monthlyBudget: data.monthlyBudget,
    currency: {
      id: data.currency.id,
      name: data.currency.name,
      symbol: data.currency.symbol,
      code: data.currency.code,
      selected: true,
    },
  };
  console.log('User data after setting the values: ', userData);

  return userData;
}
