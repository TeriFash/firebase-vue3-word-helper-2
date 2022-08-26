import { computed } from 'vue';
import { useStore } from 'vuex';
import { firebaseBdDataSetStore } from '@/utils/firebase';

export const useUser = () => {
  const store = useStore();
  const user = computed(() => store.state.user);
  return user;
};
export const useIsSignedIn = () => {
  const store = useStore();
  const isSignedIn = computed(() => store.getters.isSignedIn);
  return isSignedIn;
};
export const useData = () => {
  const store = useStore();
  const data = computed(() => store.state.data);
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
export const updateClipboardData = async (value: any) => {
  try {
    const store = useStore();
    const result = await store.dispatch('setClipboardData', value);
    return result;
  } catch (error) {
    // console.error(error);
  }
};
export const useSetSectionsData = async () => {
  try {
    const store = useStore();
    const dataLocal: any = localStorage.getItem('sections');

    if (JSON.parse(dataLocal)) {
      const result = await store.dispatch('setSectionData', JSON.parse(dataLocal));
      return result;
    } else {
      const data: any[] | undefined = await firebaseBdDataSetStore();
      const result = await store.dispatch('setSectionData', data);
      return result;
    }
  } catch (error) {
    console.error('useSetSectionsData', error);
  }
};
