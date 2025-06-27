export default function createUrlParams(form: HTMLFormElement | undefined) {
  // get the form data
  const formData = new FormData(form);

  // create the urlParams
  const urlData = new URLSearchParams();
  for (const pair of formData) {
    console.log(pair[0], pair[1]);
    urlData.append(pair[0], String(pair[1]));
  }

  return urlData;
}
