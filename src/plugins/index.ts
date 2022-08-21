import { App } from 'vue';
import moment from 'moment';
// import { Modal, IModal } from '@/plugins/modal';
import emitter from './emitter'; //  Emitter, TEmitterEventTypes
import bootstrap from './bootstrap';
import clipboard from './clipboard';
import HeaderNavbar from '@/components/HeaderNavbar.vue';

export default {
  install: (app: App) => {
    app.component('header-navbar', HeaderNavbar);
    app.use(bootstrap);
    app.use(clipboard);

    app.config.globalProperties.$emitter = emitter;
    app.config.globalProperties.$moment = moment;
    // app.config.globalProperties.$modal = new Modal();
  },
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $emitter: any; //Emitter<TEmitterEventTypes>;
    $moment: any;
  }
}
