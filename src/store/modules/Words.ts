import { Module } from 'vuex';
import { toUpperFirst } from '@/utils';

export interface IWordsState {
  sections: object;
  sectionsTitles: object;
}

const store: Module<IWordsState, unknown> = {
  // namespaced: true,
  state() {
    return {
      sections: {},
      sectionsTitles: {},
    };
  },
  mutations: {
    loadSections(state: IWordsState, data: AnyObject) {
      state.sections = data;
      localStorage.setItem('sections', JSON.stringify(data));
    },
    loadSectionsTitles(state: IWordsState, titles: AnyObject) {
      state.sectionsTitles = titles;
    },
  },
  actions: {
    setSectionData: async ({ commit }, data: AnyObject) => {
      try {
        const titles: { [key: string]: string } = {};
        // const { simple, rare, accompanying } = data;
        Object.keys(data).forEach((title: any) => {
          titles[title] = toUpperFirst(title);
        });
        commit('loadSections', data);
        commit('loadSectionsTitles', titles);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getSectionCurrentData: (state: IWordsState, getters: any) => {
      const {
        getSectionsValues,
        getTabActive: { index },
      } = getters;
      return getSectionsValues[index];
    },
    getSectionsList: (state: IWordsState) => state.sections,
    getSectionsValues: (state: IWordsState) => Object.values(state.sections),
    getSectionsKeys: (state: IWordsState) => Object.keys(state.sections),
    getSectionsTitles: (state: IWordsState, getters: any) => {
      const titles: { [key: string]: string } = {};

      getters.getSectionsKeys.forEach((title: string) => {
        titles[title] = toUpperFirst(title);
      });

      return titles;
    },
  },
};

export const words = store;
export default store;
