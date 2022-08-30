import { Module } from 'vuex';
import { User } from 'firebase/auth';

export interface IAppUser {
  user: User | null | undefined;
}

const store: Module<IAppUser, unknown> = {
  // namespaced: true,
  state() {
    return {
      user: undefined,
    };
  },
  mutations: {
    setUser(state: IAppUser, user: User | null) {
      state.user = user;
    },
  },
  actions: {},
  getters: {
    isSignedIn: (state: IAppUser) => {
      return state.user !== null && state.user !== undefined;
    },
  },
};

export const user = store;
export default store;
