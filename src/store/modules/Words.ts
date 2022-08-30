import { Module } from 'vuex';

export interface StoreWords {
  sections: object;
  sectionsTitles: object;
}

const store: Module<StoreWords, unknown> = {
  // namespaced: true,
  state() {
    return {
      sections: {},
      sectionsTitles: {},
    };
  },
  mutations: {
    loadSections(state: StoreWords, data: AnyObject) {
      const { simple, accompanying, rare } = data;
      const sections = { simple, accompanying, rare };

      state.sections = sections;
      localStorage.setItem('sections', JSON.stringify(sections));
    },
    loadSectionsTitles(state: StoreWords, titles: AnyObject) {
      state.sectionsTitles = titles;
    },
  },
  actions: {
    setSectionData: async ({ commit }, payload) => {
      try {
        const { simple, rare, accompanying }: any = payload;
        const titles: any = {};
        const data: any = { simple, rare, accompanying };
        Object.keys(data).forEach((title: any) => {
          titles[title] = `${title[0].toUpperCase()}${title.slice(1)}`;
        });
        commit('loadSections', data);
        commit('loadSectionsTitles', titles);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    getSectionsList: (state: StoreWords) => state.sections,
    getSectionsTitles: (state: StoreWords) => {
      const titles: any = {};
      Object.keys(state.sections).forEach((title: any) => {
        titles[title] = `${title[0].toUpperCase()}${title.slice(1)}`;
      });

      return titles;
    },
  },
};

export const words = store;
export default store;
