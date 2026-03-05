import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './style.js';

import { AppRouter } from '@symbiotejs/symbiote/core/full.js';

export default class NavMenu extends Symbiote {
  isoMode = true;

  onNav(e) {
    e.preventDefault();
    let el = e.target.closest('a');
    if (!el) return;
    const route = el.getAttribute('route');
    if (route) {
      AppRouter.navigate(route);
    }
  }

  renderCallback() {
    this.sub('router/route', (route) => {
      this.ref.nav.querySelectorAll('a').forEach((el) => {
        if (el.getAttribute('route') === route) {
          el.setAttribute('current', '');
        } else {
          el.removeAttribute('current');
        }
      });
    });
  }
}

NavMenu.rootStyles = styles;
NavMenu.template = template;

NavMenu.reg('nav-menu');
