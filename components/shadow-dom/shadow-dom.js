import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

class ShadowDom extends Symbiote {
  isoMode = true;
  onShadowClick() {
    alert('Hello from Shadow DOM!');
  }
}

ShadowDom.shadowStyles = styles;
ShadowDom.template = template;

ShadowDom.reg('shadow-dom');