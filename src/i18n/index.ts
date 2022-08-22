import ru from './languages/ru';
import en from './languages/en';
import ua from './languages/ua';

const locale: any = window.localStorage.getItem('lang');

const messages = {
  ru,
  en,
  ua,
};

const config = {
  legacy: false,
  locale: locale,
  globalInjection: true,
  messages,
};

export const languages = Object.keys(messages);
export const i18nConf = config;

export default config;
