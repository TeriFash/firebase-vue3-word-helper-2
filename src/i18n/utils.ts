import { App, computed, watch, getCurrentInstance } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

export const i18nUtils = (app: App) => {
  app.config.globalProperties.localizedUrl = (path: string) => {
    // const localLang: any = window.localStorage.getItem('lang');
    const langRouter = app.config.globalProperties.$route?.params?.lang;
    const lang = langRouter;
    if (lang) {
      return `/${lang}` + path;
    }
    return path;
  };
};

export const useLocalizedUrl = () => {
  const internalInstance: any = getCurrentInstance();
  const { localizedUrl } = internalInstance.appContext.config.globalProperties;

  return localizedUrl;
};

export const useI18nParam = () => {
  const route = useRoute();
  const i18n = useI18n();
  const localLang: any = window.localStorage.getItem('lang');

  const lang = computed(() => {
    return (route.params.lang as string) || localLang;
  });
  watch(lang, () => {
    i18n.locale.value = lang.value;
    localStorage.setItem('lang', lang.value);
  });
  i18n.locale.value = lang.value;
  // localStorage.setItem('lang', i18n.locale.value);
  return lang.value;
};

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    localizedUrl: any;
  }
}
