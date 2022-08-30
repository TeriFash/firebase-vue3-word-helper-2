import { Module } from 'vuex';
import { User } from 'firebase/auth';

export interface StoreUser {
  user: User | null | undefined;
}

const store: Module<StoreUser, unknown> = {
  // namespaced: true,
  state() {
    return {
      user: undefined,
    };
  },
  mutations: {
    setUser(state: StoreUser, user: User | null) {
      state.user = user;
    },
  },
  actions: {
    setText(context, payload: AnyObject) {
      context.commit('setText', payload);
    },
  },
  getters: {
    isSignedIn: (state: StoreUser) => {
      return state.user !== null && state.user !== undefined;
    },
  },
};

export const user = store;
export default store;
