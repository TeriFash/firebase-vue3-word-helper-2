import { App } from 'vue';
import BootstrapVue3 from 'bootstrap-vue-3';
// import { IconsPlugin } from 'bootstrap-vue';
// import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

export default {
  install: (app: App) => {
    app.use(BootstrapVue3);
  },
};
