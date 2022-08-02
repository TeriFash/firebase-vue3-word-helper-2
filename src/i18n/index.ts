import en from "./en";
import ru from "./ru";

const messages = {
  en,
  ru,
};

const config = {
  locale: "ru",
  messages,
};

export const languages = Object.keys(messages);

export default config;
