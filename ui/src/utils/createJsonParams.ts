
export default function createJsonParams(form: HTMLFormElement | undefined) {
    // get the form data
    const formData = new FormData(form);

    // create the json object
    const jsonData: { [key: string]: string } = {};
    for (const pair of formData) {
        const keyAsString = String(pair[0]);
        const valueAsString = String(pair[1]);
        jsonData[keyAsString] = valueAsString;
    }

    const stringifiedJson = JSON.stringify(jsonData);

    return stringifiedJson;
}