import { PubSub } from '@symbiotejs/symbiote';
import appCtx from './app.js';

const langMap = {
  en: {
    'home': 'Home',
    'about': 'About',
    'contact': 'Contact',
  },

  ru: {
    'home': 'Дом',
    'about': 'О нас',
    'contact': 'Контакты',
  },
}

const l10n = PubSub.registerCtx(langMap.en, 'l10n');
appCtx.sub('currentLang', (lang) => {
  l10n.multiPub(langMap[lang]);
});

export default l10n;