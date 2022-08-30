// @ts-nocheck
import { StoreApp, app } from './app';
import { StoreUser, user } from './user';
import { StoreWords, words } from './words';
export function loadModules() {
  const context = { app, words, user } as AnyObject;
  // const context = import.meta.globEager('./*.ts') as AnyObject;

  const modules: AnyObject = {};

  Object.keys(context).forEach((key: string) => {
    if (key === './index.ts') return;
    modules[key.replace(/(\.\/|\.ts)/g, '')] = context[key].default;
  });

  return { context, modules };
}
export const modules2 = { app, words, user }
export const { context, modules } = loadModules();
