import { App } from 'vue';
import moment from 'moment';
// import { Modal, IModal } from '@/plugins/modal';
import emitter from './emitter'; //  Emitter, TEmitterEventTypes
import bootstrap from './bootstrap';
import clipboard from './clipboard';
import { contextmenu, Closable, focus, pin } from '@/directive';
import HeaderNavbar from '@/components/HeaderNavbar.vue';

export default {
  install: (app: App) => {
    app.component(HeaderNavbar.name, HeaderNavbar);
    app.directive('contextmenu', contextmenu);
    app.directive('pin', pin);
    app.directive('focus', focus);
    app.directive('closable', Closable());
    app.directive('closableonmount', Closable(true));

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
