import { computed } from 'vue';
import { useStore } from 'vuex';
import { firebaseBdDataSetStore } from '@/utils/firebase';
import { parsedLocalStorage } from '@/utils';
import { TabActive, SectionsWords } from '@/types';

export const useUser = () => {
  const store = useStore();
  const user = computed(() => store.state.user.user);
  return user;
};
export const useIsSignedIn = () => {
  const store = useStore();
  const isSignedIn = computed(() => store.getters.isSignedIn);
  return isSignedIn;
};
export const useData = () => {
  const store = useStore();
  const data = computed(() => store.state.app.data);
  return data;
};
export const useSections = () => {
  const store = useStore();
  const sectionsValues = computed(() => store.getters.getSectionCurrentData);
  return sectionsValues;
};
export const useTextInClipboard = () => {
  const store = useStore();
  const textInClipboard = computed(() => store.getters.getClipboardData);
  return textInClipboard;
};
export const useGetTabActive = () => {
  const store = useStore();
  const getTabActive = computed(() => store.getters.getTabActive);
  return getTabActive;
};
export const useTabActive = () => {
  const store = useStore();
  const tabActiveStore = computed(() => store.state.app.tabActive);
  const tabActive = computed(() => store.getters.getTabActive);
  if (tabActive.value.name) {
    store.commit('setTabActive', tabActive.value);
    return tabActive;
  } else {
    store.dispatch('setTabActive', tabActiveStore.value);
    return tabActiveStore;
  }
};
export const initClipboardData = async () => {
  try {
    const store = useStore();
    const text = await window.navigator.clipboard.readText();
    const result = await store.dispatch('setClipboardData', text);
    return result;
  } catch (error) {
    // console.error(error);
  }
};
export const updateClipboardData = async () => {
  try {
    const store = useStore();
    const result = await store.dispatch('fetchClipboardData');
    return result;
  } catch (error) {
    console.error(error);
  }
};
export const useSetSectionsData = async () => {
  try {
    const store = useStore();
    const dataLocal: SectionsWords = parsedLocalStorage('sections');

    if (Object.values(dataLocal).length) {
      await store.dispatch('setSectionData', dataLocal);
      return dataLocal;
    } else {
      const data = await firebaseBdDataSetStore();
      await store.dispatch('setSectionData', data);
      return data;
    }
  } catch (error) {
    console.error('useSetSectionsData', error);
  }
};
