import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './style.js';

export default class NavMenu extends Symbiote {
  isoMode = true;
}

NavMenu.rootStyles = styles;
NavMenu.template = template;

NavMenu.reg('nav-menu');
