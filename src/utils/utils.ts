import { computed } from 'vue';
import { useStore } from 'vuex';
import { firebaseBdDataSetStore } from '@/utils/firebase';
import { parsedLocalStorage } from '@/utils';
import { TabActive } from '@/types';

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
  const sections = computed(() => store.getters.getSectionsList);
  return sections;
};
export const useTextInClipboard = () => {
  const store = useStore();
  // const text = await window.navigator.clipboard.readText();
  const textInClipboard = computed(() => store.getters.getClipboardData);
  return textInClipboard;
};
export const useTabActive = () => {
  const store = useStore();
  const tabActiveStore = computed(() => store.state.app.tabActive);
  const tabActiveLocal: TabActive = parsedLocalStorage('tabActive');
  const tabActive = computed(() => store.getters.getTabActive);
  if (tabActiveLocal) {
    store.dispatch('setTabActive', tabActiveLocal);
  } else {
    store.dispatch('setTabActive', tabActiveStore.value);
  }

  return tabActive;
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
    const dataLocal: any = {}; // parsedLocalStorage('sections');

    if (dataLocal) {
      const result = await store.dispatch('setSectionData', dataLocal);
      return result;
    } else {
      const data: any[] | undefined = await firebaseBdDataSetStore();
      const result = await store.dispatch('setSectionData', data);
      console.log('✅ 🧊 ~ result', result);
      return result;
    }
  } catch (error) {
    console.error('useSetSectionsData', error);
  }
};
