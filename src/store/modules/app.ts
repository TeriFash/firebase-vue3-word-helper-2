import { Module } from 'vuex';

export interface StoreApp {
  textInClipboard: string | '';
  tabActive: {
    index: number;
    name: string;
  };
}

const store: Module<StoreApp, unknown> = {
  // namespaced: true,
  state() {
    return {
      textInClipboard: '',
      tabActive: {
        index: 0,
        name: 'simple',
      },
    };
  },
  mutations: {
    setTabActive(state: StoreApp, active: any) {
      state.tabActive = active;
      Object.assign(state.tabActive, active);
      localStorage.setItem('tabActive', JSON.stringify(state.tabActive));
    },
    loadClipboardData(state: StoreApp, data: any) {
      // const statusCheck = state.textInClipboard === data;

      state.textInClipboard = data;
      localStorage.setItem('textInClipboard', data);
    },
  },
  actions: {},
  getters: {
    // getSectionCurrentData: (state: StoreApp, getters: any, rootState: any) => {
    //   console.log('✅ 🧊 ~ getters', getters);
    //   return Object.keys(rootState.words.state.sections)[state.tabActive.index];
    // },
  },
};

export const app = store;
export default store;
