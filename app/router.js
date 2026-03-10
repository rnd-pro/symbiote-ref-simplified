import { AppRouter } from '@symbiotejs/symbiote/core/full.js';
import '../sections/home/home-section.js'; // Synchronous import for default route and SSR.

export const routes = {
  home: {
    pattern: '/',
    title: 'Home page',
    default: true,
  },
  dashboard: {
    pattern: '/dashboard/',
    title: 'Dashboard',
    load: () => import('../sections/dashboard/dashboard-section.js'),
  },
  settings: {
    pattern: '/settings/',
    title: 'Settings',
    load: () => import('../sections/settings/settings-section.js'),
  },
}

export default AppRouter.initRoutingCtx('router', routes);
