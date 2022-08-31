import { createApp } from 'vue';
import { createI18n } from 'vue-i18n';
import './assets/css/index.css';
import App from './App.vue';
import plugins from '@/plugins';
import router from './router';
import store from './store';
import i18nConf from './i18n/index';
import { i18nUtils } from './i18n/utils';

const i18n = createI18n(i18nConf);
const app = createApp(App);

app.use(plugins);
app.use(store);
app.use(router);
app.use(i18n);
app.use(i18nUtils);

// app.use(VueClipboard);

app.mount('#app');
