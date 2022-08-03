import { createStore } from "vuex";
import { User } from "firebase/auth";

interface State {
  user: User | null | undefined;
  textInClipboard: string | "";
  sections: object | null | undefined;
  data: object | null | undefined;
}

export default createStore<State>({
  state: {
    user: undefined,
    textInClipboard: "",
    sections: {},
    data: [],
  },
  mutations: {
    setUser(state: State, user: User | null) {
      state.user = user;
    },
    loadSections(state: State, data) {
      const { simple, accompanying, rare } = data[2];
      const sections = { simple, accompanying, rare };
			
      state.sections = sections;
      localStorage.setItem("sections", JSON.stringify(sections));

      // if (localStorage.getItem("sections")) {
      // }
    },
    loadData(state: State, data) {
      state.data = data;
    },
    loadClipboardData(state: State, data) {
      const statusCheck = state.textInClipboard === data;

      if (!statusCheck) {
        state.textInClipboard = data;
        localStorage.setItem("textInClipboard", data);
      }
    },
  },
  getters: {
    isSignedIn: (state: State) => {
      return state.user !== null && state.user !== undefined;
    },
    getDataList: (state: State) => state.data,
    getSectionsList: (state: State) => state.sections,
    getClipboardData: (state: State) => state.textInClipboard,
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
        commit("loadSections", result);
      } catch (error) {
        console.error(error);
      }
    },
    setData({ commit }, payload) {
      // const { collection } = payload;
      // const result: any[] = [];
      try {
        // await this._vm.$db
        //   .collection(collection)
        //   .get()
        //   .then((querySnapshot: any[]) => {
        //     querySnapshot.forEach((doc) => {
        //       result.push(doc.data());
        //     });
        //     commit("loadData", result);
        //   });
        commit("loadData", payload);
      } catch (error) {
        console.error(error);
      }
    },
    setClipboardData: async ({ commit }, payload) => {
      try {
        let result = "";
        const text = await window.navigator.clipboard.readText();
        const textCheck = text.split(" ");

        if (textCheck.length <= 2) {
          result = textCheck[0];
        } else {
          result = textCheck[0] || textCheck[1];
        }

        commit("loadClipboardData", result);

        if (payload) commit("loadClipboardData", !payload ? payload : "");
        return result;
      } catch (error) {
        console.error(error);
      }
    },
  },
  modules: {},
});
