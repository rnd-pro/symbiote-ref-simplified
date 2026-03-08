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
  'Admin',
  'Editor',
  'Viewer',
  'Server only',
  'Client only',
]);

/** @type {Record<string, Partial<Record<typeof l10nKeys[number], string>>>} */
const langMap = {
  en: {},
  ru: {
    'Home': 'Главная',
    'Home page': 'Главная страница',
    'Dashboard': 'Панель управления',
    'Settings': 'Настройки',
    'Theme': 'Тема',
    'Dark': 'Тёмная',
    'Light': 'Светлая',
    'Add a task...': 'Добавить задачу...',
    'Admin': 'Администратор',
    'Editor': 'Редактор',
    'Viewer': 'Наблюдатель',
    'Server only': 'Только сервер',
    'Client only': 'Только клиент',
  },
  es: {
    'Home': 'Inicio',
    'Home page': 'Página principal',
    'Dashboard': 'Panel',
    'Settings': 'Ajustes',
    'Theme': 'Tema',
    'Dark': 'Oscuro',
    'Light': 'Claro',
    'Add a task...': 'Añadir tarea...',
    'Admin': 'Administrador',
    'Editor': 'Editor',
    'Viewer': 'Observador',
    'Server only': 'Solo servidor',
    'Client only': 'Solo cliente',
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