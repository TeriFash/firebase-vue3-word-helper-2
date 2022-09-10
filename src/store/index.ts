//import Base from '@/types/Base';
import { InjectionKey } from 'vue';
import { createStore, useStore as baseUseStore, Store } from 'vuex';
import { modules, IStore } from './modules';
export interface State {
  [key: string]: any;
}

export const key: InjectionKey<Store<State>> = Symbol();

export default createStore<Store<IStore>>({
  modules,
  // strict: Base.IS_DEV,
});

export function useStore() {
  return baseUseStore(key);
  // return baseUseStore();
}

// export default store;
