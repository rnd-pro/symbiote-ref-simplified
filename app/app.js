import { PubSub } from '@symbiotejs/symbiote';

export default PubSub.registerCtx({
  appTitle: 'Symbiote.js',
  currentLang: 'en',
  darkTheme: true,
  toDoList: [
    {
      text: 'Learn Symbiote.js',
      done: false,
    },
    {
      text: 'Build an app',
      done: false,
    },
    {
      text: 'Deploy to production',
      done: false,
    },
  ],
}, 'app');
