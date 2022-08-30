import { App } from 'vue';
import { VueClipboard, toClipboard } from '@soerenmartius/vue3-clipboard';

export default {
  install: (app: App) => {
    app.use(VueClipboard, {
      autoSetContainer: true,
      appendToBody: true,
    });

    app.config.globalProperties.$copyTo = async (text: string, action: any) => {
      return await toClipboard(text, action);
    };
    app.config.globalProperties.$readClipboard = async () => {
      return await window.navigator.clipboard.readText();
    };
    app.config.globalProperties.$writeClipboard = async (data: any) => {
      return await window.navigator.clipboard.write(data);
    };
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $copyTo: any;
    $readClipboard: any;
    $writeClipboard: any;
  }
}
