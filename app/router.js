import AppRouter from '@symbiotejs/symbiote/core/AppRouter.js';

export default AppRouter.initRoutingCtx('Router', {
  home: {
    pattern: '/',
    title: 'Home page',
    default: true,
  },
});