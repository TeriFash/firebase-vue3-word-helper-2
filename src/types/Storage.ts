export default class Storage {
  static get(name: string) {
    const data = localStorage.getItem(name);
    if (!data) return data;
    return JSON.parse(data);
  }

  static set(name: string, val: any) {
    return localStorage.setItem(name, JSON.stringify(val));
  }

  static add(name: string, addVal: any) {
    const oVal = Storage.get(name);
    const nVal = oVal.concat(addVal);
    Storage.set(name, nVal);
  }
}
