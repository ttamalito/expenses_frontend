import { isLoggedInPath } from './paths';

export default async function IsLoggedInRequest() {
  const name = 'accessToken=';
  const decodedCookie = decodeURIComponent(document.cookie);
  //console.log(decodedCookie);
  const cookies = decodedCookie.split(';');
  let accessToken = '';
  for (let i = 0; i < cookies.length; i++) {
    let c = cookies[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      accessToken = c.substring(name.length, c.length);
    }
  }

  if (accessToken === '') {
    return false;
  }
  //console.log('Access token: ', accessToken);
  //console.log('About to send request to: ', isLoggedInPath);

  const response = await fetch(isLoggedInPath, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  //console.log('Response: ', response);

  if (response.ok) {
    return true;
  } else {
    return false;
  }
}
