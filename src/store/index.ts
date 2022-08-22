import { createStore } from 'vuex';
import { User } from 'firebase/auth';
interface State {
  user: User | null | undefined;
  textInClipboard: string | '';
  tabActive: string | any;
  sections: object;
  sectionsTitles: object;
  data: object | null | undefined;
}

export default createStore<State>({
  state: {
    user: undefined,
    textInClipboard: '',
    tabActive: '',
    sections: {},
    sectionsTitles: {},
    data: [],
  },
  mutations: {
    setUser(state: State, user: User | null) {
      state.user = user;
    },
		setTabActive(state: State, active) {
      state.tabActive = active;
    },
    loadSections(state: State, data) {
      const { simple, accompanying, rare } = data;
      const sections = { simple, accompanying, rare };

      state.sections = sections;
      localStorage.setItem('sections', JSON.stringify(sections));

      // if (localStorage.getItem("sections")) {
      // }
    },
    loadSectionsTitles(state: State, titles) {
      state.sectionsTitles = titles;
    },
    loadClipboardData(state: State, data) {
      const statusCheck = state.textInClipboard === data;

      if (!statusCheck) {
        state.textInClipboard = data;
        localStorage.setItem('textInClipboard', data);
      }
    },
  },
  getters: {
    isSignedIn: (state: State) => {
      return state.user !== null && state.user !== undefined;
    },
    getSectionCurrentData: (state: State) => Object.keys(state.sections)[state.tabActive],
    getSectionsList: (state: State) => state.sections,
    getTabActive: (state: State) => state.tabActive,
    getSectionsTitles: (state: State) => {
      const titles: any = {};
      Object.keys(state.sections).forEach((title: any) => {
        titles[title] = `${title[0].toUpperCase()}${title.slice(1)}`;
      });

      return titles;
    },
    getClipboardData: (state: State) => state.textInClipboard || localStorage.getItem('textInClipboard'),
  },
  actions: {
    fetchSections: async ({ commit }) => {
      try {
        const result: any[] = [];
        const querySnapshot: any[] = [];
        // this._vm.$sections

        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });
        commit('loadSections', result);
      } catch (error) {
        console.error(error);
      }
    },
    setTabActive({ commit }, payload) {
			commit('setTabActive', payload);
		},
    setSetionData({ commit }, payload) {
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
    setClipboardData: async ({ commit }, payload) => {
      try {
        let result = '';
        const textInClipboard: string | any = localStorage.getItem('textInClipboard');
        const textCheck = payload.split(' ');

        if (payload === textInClipboard) {
          return;
        }

        if (textCheck.length <= 2) {
          result = textCheck[0];
        } else {
          result = textCheck[0] || textCheck[1];
        }

        commit('loadClipboardData', result);

        // if (payload) commit('loadClipboardData', !payload ? payload : '');
        return result;
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
