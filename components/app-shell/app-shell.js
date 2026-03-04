import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

export default class AppShell extends Symbiote {
  isoMode = true;
  sectionHtml = '';

  changeLang(e) {
    this.$['app/currentLang'] = e.target.value;
  }
}

AppShell.rootStyles = styles;
AppShell.template = template;

AppShell.reg('app-shell');