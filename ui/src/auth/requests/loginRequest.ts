import createJsonParams from '../../utils/createJsonParams';
import { loginPath } from './paths';

export default function logInRequest(form: HTMLFormElement | undefined) {
  const jsonData = createJsonParams(form);

  fetch(loginPath, {
    method: 'POST',
    body: jsonData,
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          const accessToken = data.accessToken;
          const dateInOneHOur = Date.now() + 3300000;
          const utcDate = new Date(dateInOneHOur).toUTCString();
          document.cookie = `accessToken=${accessToken}; expires=${utcDate};`;
          window.location.href = '/home';
        });
      } else {
        throw new Error('User could not login: ' + response.status);
      }
    })
    .catch((error) => {
      console.error('Fatal error', error);
      alert('Internal Server Error');
    });
}
