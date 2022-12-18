/* eslint-disable */
declare module '*.vue' {
	import type { DefineComponent } from 'vue'
	const component: DefineComponent<{}, {}, any>
	export default component
}
declare module 'click-outside-vue3';
declare module 'lodash';
declare module 'vue-router';
declare module 'vue-i18n';

interface AnyObject {
	[key: string]: any
}

interface StorePropsItem<T> {
  state: () => T;
  // actions: {[key: string]: (state: T, data: any) => void};
  actions: { [key: string]: Function };
}
