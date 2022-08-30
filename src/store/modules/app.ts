import { Module } from 'vuex';
// import { IBaseStore } from '@/types/Base';
export interface IAppState {
  data: object | null | undefined;
  textInClipboard: string | '';
  tabActive: {
    index: number;
    name: string;
  };
}

// export interface IAppState extends IBaseStore {
//   state: IAppState;
// }

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
    setTabActive(state: IAppState, active: any) {
      state.tabActive = active;
      Object.assign(state.tabActive, active);
      localStorage.setItem('tabActive', JSON.stringify(state.tabActive));
    },
    loadClipboardData(state: IAppState, data: any) {
      state.textInClipboard = data;
      localStorage.setItem('textInClipboard', data);
    },
  },
  actions: {
    setTabActive({ commit }, payload) {
      commit('setTabActive', payload);
    },
    fetchClipboardData: async ({ commit, getters }) => {
      try {
        let result = '';
        const { getClipboardData } = getters;
        const text = await window.navigator.clipboard.readText();

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
    getTabActive: (state: IAppState) => {
      const items = localStorage.getItem('tabActive');
      if (items && JSON.parse(items)) return JSON.parse(items);
      return state.tabActive;
    },
    getClipboardData: (state: IAppState) =>
      state.textInClipboard || localStorage.getItem('textInClipboard'),
  },
};

export const app = store;
export default store;
