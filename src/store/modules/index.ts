// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { IAppState, app } from './app';
import { IAppUser, user } from './user';
import { IAppWords, words } from './words';

export interface IStore {
  app: IAppState;
  user: IAppUser;
  words: IAppWords;
}

export const modules = {
  app,
  user,
  words,
};
