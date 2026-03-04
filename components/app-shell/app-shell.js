import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

export default class AppShell extends Symbiote {
  isoMode = true;
}

AppShell.rootStyles = styles;
AppShell.template = template;

AppShell.reg('app-shell');