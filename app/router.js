import { AppRouter } from '@symbiotejs/symbiote/core/full.js';

export const routes = {
  home: {
    pattern: '/',
    title: 'Home page',
    default: true,
  },
  dashboard: {
    pattern: '/dashboard/',
    title: 'Dashboard',
  },
  settings: {
    pattern: '/settings/',
    title: 'Settings',
  },
}

export default AppRouter.initRoutingCtx('router', routes);
