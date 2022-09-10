// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { IAppState, app } from 'app.ts';
import { IAppUser, user } from 'user.ts';
import { IAppWords, words } from 'words.ts';

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
