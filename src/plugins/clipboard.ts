import { App } from 'vue';
import { VueClipboard } from '@soerenmartius/vue3-clipboard';

export default {
  install: (app: App) => {

		app.use(VueClipboard)
    // const copyTo = toClipboard;
    // app.use(VueClipboard, {
    //   autoSetContainer: true,
    //   appendToBody: true,
    // });

    // const copyTo = async function (text: string, action: any) {
    //   await toClipboard(text, action);
    // };

    // app.config.globalProperties.$copyTo = copyTo;
  },
};

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $copyTo: any;
//   }
// }
