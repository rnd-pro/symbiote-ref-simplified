import { PubSub } from '@symbiotejs/symbiote';
import appCtx from './app.js';

const l10nKeys = /** @type {const} */ ([
  'Home',
  'Home page',
  'Dashboard',
  'Settings',
  'Theme',
  'Dark',
  'Light',
  'Add a task...',
]);

/** @type {Record<string, Partial<Record<typeof l10nKeys[number], string>>>} */
const langMap = {
  en: {},
  ru: {
    'Home': 'Дом',
    'Home page': 'Домашняя страница',
    'Dashboard': 'Панель',
    'Settings': 'Настройки',
    'Theme': 'Тема',
    'Dark': 'Тёмная',
    'Light': 'Светлая',
    'Add a task...': 'Добавить задачу...',
  },
  es: {
    'Home': 'Casa',
    'Home page': 'Página de inicio',
    'Dashboard': 'Panel',
    'Settings': 'Configuración',
    'Theme': 'Tema',
    'Dark': 'Oscuro',
    'Light': 'Claro',
    'Add a task...': 'Agregar tarea...',
  },
}

function getL10nData(lang) {
  /** @type {Record<string, string>} */
  const data = {};
  l10nKeys.forEach((key) => {     
    data[key] = langMap[lang][key] || key;
  });
  return data;
}

const l10n = PubSub.registerCtx(getL10nData(appCtx.read('currentLang')), 'l10n');
appCtx.sub('currentLang', (lang) => {
  l10n.multiPub(getL10nData(lang));
});

export default l10n;