import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

export default class ServerOnly extends Symbiote {
  isoMode = true;
  renderedAt = new Date().toISOString();
  nodeVersion = typeof process !== 'undefined' ? process.version : 'N/A';
  ssrEngine = 'Symbiote SSR';
}

ServerOnly.rootStyles = styles;
ServerOnly.template = template;

ServerOnly.reg('server-only');
