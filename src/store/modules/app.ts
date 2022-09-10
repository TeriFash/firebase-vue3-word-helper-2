import { Module } from 'vuex';
import { parsedLocalStorage } from '@/utils';
// import { IBaseStore } from '@/types/Base';
export interface IAppState {
  data: object | null | undefined;
  textInClipboard: string | '';
  tabActive: {
    index: number | 0 | string;
    name: string | '';
  };
}

// export interface IAppState extends IBaseStore {
//   state: IAppState;
// }
const tabActive = parsedLocalStorage('tabActive');

const store: Module<IAppState, unknown> = {
  // namespaced: true,
  state() {
    return {
      data: [],
      textInClipboard: '',
      tabActive: {
        index: 0,
        name: 'simple',
      },
    };
  },
  mutations: {
    setTabActive(state: IAppState, tabActive) {
      state.tabActive = tabActive;
      localStorage.setItem('tabActive', JSON.stringify(tabActive));
    },
    loadClipboardData(state: IAppState, data: any) {
      state.textInClipboard = data;
      localStorage.setItem('textInClipboard', data);
    },
  },
  actions: {
    setTabActive({ getters, commit }, payload) {
      const { getSectionsKeys } = getters;

      commit('setTabActive', {
        index: payload.index,
        name: payload.name || getSectionsKeys[payload.index],
      });
    },
    fetchClipboardData: async ({ commit, getters }, text) => {
      try {
        let result = '';
        const { getClipboardData } = getters;

        if (text.toString() !== getClipboardData.toString()) {
          const textCheck: string[] = text.split(' ');

          if (textCheck.length <= 2) {
            result = textCheck[0];
          } else {
            result = textCheck[0] || textCheck[1];
          }

          commit('loadClipboardData', result);
          return result;
        } else {
          return getClipboardData;
        }
      } catch (error) {
        console.error(error);
      }
    },
    setClipboardData: async ({ commit, getters }, payload) => {
      try {
        let result = '';
        const { getClipboardData } = getters;
        const text = await window.navigator.clipboard.readText();
        if (text.toString() !== getClipboardData.toString()) {
          const textCheck = payload.split(' ');

          if (textCheck.length <= 2) {
            result = textCheck[0];
          } else {
            result = textCheck[0] || textCheck[1];
          }

          commit('loadClipboardData', result);
          return result;
        } else {
          return getClipboardData;
        }
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getTabActive: (state: IAppState) =>
      tabActive || parsedLocalStorage('tabActive'),
    getClipboardData: (state: IAppState) =>
      state.textInClipboard || localStorage.getItem('textInClipboard'),
  },
};

export const app = store;
export default store;
