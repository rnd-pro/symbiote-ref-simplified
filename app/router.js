import { AppRouter } from '@symbiotejs/symbiote/core/full.js';

export default AppRouter.initRoutingCtx('router', {
  home: {
    pattern: '/',
    title: 'Home page',
    default: true,
  },
});