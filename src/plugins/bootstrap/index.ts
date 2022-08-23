import { App } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';
import {
  BootstrapIconsPlugin,
  BIconClipboardData,
  BIconFileEarmarkXFill,
  BIconEraserFill,
  BIconBrightnessHighFill,
  BIconArrowRightShort,
  BIconMoonStarsFill,
} from 'bootstrap-icons-vue';
// import { IconsPlugin } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  install: (app: App) => {
    const components: any = {
      BIconClipboardData,
      BIconFileEarmarkXFill,
      BIconEraserFill,
      BIconBrightnessHighFill,
      BIconArrowRightShort,
      BIconMoonStarsFill,
    };
    app.use(BootstrapVue3);
    app.use(BootstrapIconsPlugin);
    Object.keys(components).forEach((name) => app.component(name, components[name]));
  },
};
