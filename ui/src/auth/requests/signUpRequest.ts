import createJsonParams from "../../utils/createJsonParams";
import {signUpPath} from "./paths";


export default function signUpRequest(form: HTMLFormElement | undefined) {
    const urlData = createJsonParams(form);

    fetch(signUpPath, {
        method: 'POST',
        body: urlData,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
           response.json().then(data => {
               const accessToken = data.accessToken;
               const dateInOneHOur = Date.now() + 3300000;
               const utcDate = new Date(dateInOneHOur).toUTCString();
               document.cookie = `accessToken=${accessToken}; expires=${utcDate};`;
               window.location.href = '/';
           });
        } else {
            throw new Error('User could not be created: ' + response.status);
        }
    }).catch(error => {
        console.error('Fatal error', error);
        alert('Internal Server Error');
    });

}