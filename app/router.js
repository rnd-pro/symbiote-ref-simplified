import { AppRouter } from '@symbiotejs/symbiote/core/full.js';

export default AppRouter.initRoutingCtx('router', {
  home: {
    pattern: '/dist/',
    title: 'Home page',
    default: true,
  },
  dashboard: {
    pattern: '/dist/dashboard/',
    title: 'Dashboard',
  },
  settings: {
    pattern: '/dist/settings/',
    title: 'Settings',
  },
});
