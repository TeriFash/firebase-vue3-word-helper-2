export const toUpperFirst = (str: any) => {
  const strFix = str.toString();
  return `${strFix[0].toUpperCase()}${strFix.slice(1)}`;
};

export const parsedLocalStorage = (key: string): any | undefined => {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return undefined;
};
