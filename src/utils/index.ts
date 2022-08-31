export const toUpperFirst = (str: any) => {
  const strFix = str.toString();
  return `${strFix[0].toUpperCase()}${strFix.slice(1)}`;
};

export const parsedLocalStorage = (key: string, str = false): any => {
  let json: string | null | any;

  json = localStorage.getItem(key);

  if (json) {
    json = str ? json : JSON.parse(json);
    return json;
  }

  return str ? json : null;
};

export function setSessionStorage(key: string, value: any): void {
  const str = window.JSON.stringify(value);
  window.sessionStorage.setItem(key, str);
}

export function getSessionStorage(key: string): any {
  let json: string | null;
  json = window.sessionStorage.getItem(key);
  if (json) json = window.JSON.parse(json);
  return json;
}

export function setLocalStorage(key: string, value: any): void {
  const str = window.JSON.stringify(value);
  window.localStorage.setItem(key, str);
}

export function getLocalStorage(key: string): any {
  let json: string | null;
  json = window.localStorage.getItem(key);
  if (json) json = window.JSON.parse(json);
  return json;
}
