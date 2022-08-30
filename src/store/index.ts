// import { createStore } from 'vuex';
// // import { User } from 'firebase/auth';
// interface State {
//   // user: User | null | undefined;
//   textInClipboard: string | '';
//   tabActive: {
//     index: number;
//     name: string;
//   };
//   // sections: object;
//   // sectionsTitles: object;
//   data: object | null | undefined;
// }

// export default createStore<State>({
//   state: {
//     // user: undefined,
//     textInClipboard: '',
//     tabActive: {
//       index: 0,
//       name: 'simple',
//     },
//     // sections: {},
//     // sectionsTitles: {},
//     data: [],
//   },
//   mutations: {
//     // setUser(state: State, user: User | null) {
//     //   state.user = user;
//     // },
//     // setTabActive(state: State, active) {
//     //   state.tabActive = active;
//     //   Object.assign(state.tabActive, active);
//     //   localStorage.setItem('tabActive', JSON.stringify(state.tabActive));
//     // },
//     // loadSections(state: State, data) {
//     //   const { simple, accompanying, rare } = data;
//     //   const sections = { simple, accompanying, rare };
//     //   state.sections = sections;
//     //   localStorage.setItem('sections', JSON.stringify(sections));
//     // },
//     // loadSectionsTitles(state: State, titles) {
//     //   state.sectionsTitles = titles;
//     // },
//     // loadClipboardData(state: State, data) {
//     //   // const statusCheck = state.textInClipboard === data;
//     //   // if (!statusCheck) {
//     //   state.textInClipboard = data;
//     //   localStorage.setItem('textInClipboard', data);
//     //   // }
//     // },
//   },
//   getters: {
//     // isSignedIn: (state: State) => {
//     //   return state.user !== null && state.user !== undefined;
//     // },
//     // getSectionCurrentData: (state: State) =>
//     //   Object.keys(state.sections)[state.tabActive.index],
//     // getSectionsList: (state: State) => state.sections,
//     getTabActive: (state: State) => {
//       const items = localStorage.getItem('tabActive');
//       if (items && JSON.parse(items)) return JSON.parse(items);
//       return state.tabActive;
//     },
//     // getSectionsTitles: (state: State) => {
//     //   const titles: any = {};
//     //   Object.keys(state.sections).forEach((title: any) => {
//     //     titles[title] = `${title[0].toUpperCase()}${title.slice(1)}`;
//     //   });

//     //   return titles;
//     // },
//     getClipboardData: (state: State) =>
//       state.textInClipboard || localStorage.getItem('textInClipboard'),
//   },
//   actions: {
//     setTabActive({ commit }, payload) {
//       commit('setTabActive', payload);
//     },
//     // setSectionData({ commit }, payload) {
//     //   try {
//     //     const { simple, rare, accompanying }: any = payload;
//     //     const titles: any = {};
//     //     const data: any = { simple, rare, accompanying };
//     //     Object.keys(data).forEach((title: any) => {
//     //       titles[title] = `${title[0].toUpperCase()}${title.slice(1)}`;
//     //     });
//     //     commit('loadSections', data);
//     //     commit('loadSectionsTitles', titles);
//     //   } catch (error) {
//     //     console.error(error);
//     //   }
//     // },
//     fetchClipboardData: async ({ commit }) => {
//       try {
//         let result = '';
//         const text = await window.navigator.clipboard.readText();
//         const textCheck: string[] = text.split(' ');

//         if (textCheck.length <= 2) {
//           result = textCheck[0];
//         } else {
//           result = textCheck[0] || textCheck[1];
//         }

//         commit('loadClipboardData', result);
//         // return result;
//       } catch (error) {
//         console.error(error);
//       }
//     },
//     setClipboardData: async ({ commit, getters }, payload) => {
//       try {
//         let result = '';
//         // const { getClipboardData } = getters;
//         const text = await window.navigator.clipboard.readText();
//         const textCheck = payload.split(' ');

//         if (textCheck.length <= 2) {
//           result = textCheck[0];
//         } else {
//           result = textCheck[0] || textCheck[1];
//         }

//         commit('loadClipboardData', result);
//         return result;
//       } catch (error) {
//         console.error(error);
//       }
//     },
//   },
//   modules: {},
// });

//import Base from '@/types/Base';
import { InjectionKey } from 'vue';
import { loadModules, context, modules, modules2 } from './modules';
import {
  createStore,
  useStore as baseUseStore,
  Store,
  createLogger,
} from 'vuex';

export interface State {
  [key: string]: any;
}

export const key: InjectionKey<Store<State>> = Symbol();

const store = createStore({
  modules: modules,
  // strict: Base.IS_DEV,
  // plugins: Base.IS_DEV ? [createLogger()] : [],
});

export function useStore() {
  // return baseUseStore(key);
  return baseUseStore();
}

// // @ts-ignore
// if (import.meta.hot) {
//   // @ts-ignore
//   import.meta.hot?.accept(Object.keys(context), () => {
//     const { modules } = loadModules();
//     store.hotUpdate({
//       modules,
//     });
//   });
// }

export default store;
