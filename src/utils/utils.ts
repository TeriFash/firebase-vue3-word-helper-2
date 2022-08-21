import { computed } from "vue";
import { useStore } from "vuex";

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
  const textInClipboard = computed(() => store.getters.textInClipboard);
  return textInClipboard;
};
export const initClipboardData = async () => {
	try {
		const store = useStore();
		const result = await store.dispatch('setClipboardData');
  	return result;
	} catch (error) {
		console.error(error);
	}
};