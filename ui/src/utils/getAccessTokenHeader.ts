export default function getAccessTokenHeader() {
  const name = 'accessToken=';
  const decodedCookie = decodeURIComponent(document.cookie);
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

  return 'Bearer ' + accessToken;
}
