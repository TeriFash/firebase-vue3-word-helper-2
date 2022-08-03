import ru from "./ru";
import en from "./en";
import ja from "./ja";

const messages = {
	ru,
  en,
  ja,
};

const config = {
  legacy: false,
  locale: "ja",
  globalInjection: true,
  messages,
};

export const languages = Object.keys(messages);

export default config;
