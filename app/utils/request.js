import backend from './config';

function handleErrors(response) {
  if (!response.ok) {
    console.log(response.status);
  }
  return response;
}
/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  return response.json();
}

export function clearToken() {
  localStorage.removeItem('id_token');
}

export function getToken() {
  try {
    const idToken = localStorage.getItem('id_token');
    return new Map({ idToken });
  } catch (err) {
    clearToken();
    return new Map();
  }
}

export function makeHeaders() {
  const token = getToken().get('idToken');
  const ergoHeaders = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'X-DreamFactory-API-Key': ergoBe.apptoken,
      'Content-Type': 'application/json',
      'X-DreamFactory-Session-Token': token,
    },
  };
  return ergoHeaders;
}
/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  if (response.status === 401) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */

export function request(url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => data);
}

export function imgAuth() {
  const token = getToken().get('idToken');
  const img = `?session_token=${token}&api_key=${backend.apptoken}`;
  return img;
}

export function makeHeadersPost(data) {
  const token = getToken().get('idToken');
  const ergoHeaders = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'X-DreamFactory-API-Key': backend.apptoken,
      'Content-Type': 'application/json',
      'X-DreamFactory-Session-Token': token,
    },
    body: JSON.stringify(data),
  };
  return ergoHeaders;
}

export function makeHeadersPut(data) {
  const token = getToken().get('idToken');
  const ergoHeaders = {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'X-DreamFactory-API-Key': backend.apptoken,
      'Content-Type': 'application/json',
      'X-DreamFactory-Session-Token': token,
    },
    body: JSON.stringify(data),
  };
  return ergoHeaders;
}

export function makeHeadersPatch(data) {
  const token = getToken().get('idToken');
  const ergoHeaders = {
    method: 'PATCH',
    headers: {
      Accept: 'application/json',
      'X-DreamFactory-API-Key': backend.apptoken,
      'Content-Type': 'application/json',
      'X-DreamFactory-Session-Token': token,
    },
    body: JSON.stringify(data),
  };
  return ergoHeaders;
}

export function makeHeadersDelete() {
  const token = getToken().get('idToken');
  const ergoHeaders = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'X-DreamFactory-API-Key': backend.apptoken,
      'Content-Type': 'application/json',
      'X-DreamFactory-Session-Token': token,
    },
  };
  return ergoHeaders;
}

export function callDF(url) {
  return fetch(url, makeHeaders())
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data);
}

export function putDF(url, datas) {
  return fetch(url, makeHeadersPut(datas))
    .then(handleErrors)
    .then(response => response.json())
    .then(data => data);
}

export function deleteDF(url) {
  return fetch(url, makeHeadersDelete())
    .then(handleErrors)
    .then(response => response.json());
}
