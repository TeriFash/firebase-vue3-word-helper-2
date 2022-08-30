import Storage from './Storage';

const IS_DEV = process.env.NODE_ENV == 'development';

export default class Base {
  static IS_DEV = IS_DEV;
  static Storage = Storage;

  static cloneObjOrArr(obj: object) {
    const a = JSON.stringify(obj);
    const b = JSON.parse(a);
    return b;
  }
}
