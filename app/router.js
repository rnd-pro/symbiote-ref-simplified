import { AppRouter } from '@symbiotejs/symbiote/core/full.js';

export const routes = {
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
}

export default AppRouter.initRoutingCtx('router', routes);
