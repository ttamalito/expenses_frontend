import { FormEvent } from 'react';
import createUrlParams from './createURLParams';

/**
 * Takes an event, a value to search for in the event's srcElement
 * and a url, goes to the url with the value appended to the end
 * @param {FormEvent<HTMLFormElement>} event - the event to pull the value from
 * @param {string} valueToSearch - the name of the value to search for
 * @param {string} url - the base url to go to
 */
export function goToLink(
  event: FormEvent<HTMLFormElement>,
  valueToSearch: string,
  url: string,
) {
  event.preventDefault();
  const urlData = createUrlParams(event.currentTarget);
  const value = urlData.get(valueToSearch);
  window.location.href = `/${url}/${value}`;
}
