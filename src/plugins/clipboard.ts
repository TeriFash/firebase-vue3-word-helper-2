import { App } from 'vue';
import { VueClipboard, toClipboard } from '@soerenmartius/vue3-clipboard';

export default {
  install: (app: App) => {
    // app.use(VueClipboard);
    // const copyTo = toClipboard();
    app.use(VueClipboard, {
      autoSetContainer: true,
      appendToBody: true,
    });

    const copyTo = (app.config.globalProperties.$copyTo = async (text: string, action: any) => {
      return await toClipboard(text, action);
    });
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $copyTo: any;
  }
}
