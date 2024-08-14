import createUrlParams from "./createURLParams";

 export function goToLink(event, valueToSearch, url) {
    event.preventDefault();
    const urlData = createUrlParams(event.nativeEvent.srcElement);
    const value = urlData.get(valueToSearch);
    window.location.href = `/${url}/${value}`
}