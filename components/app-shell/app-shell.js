import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';
import { routes } from '../../app/router.js';

export default class AppShell extends Symbiote {
  isoMode = true;
  sectionHtml = '';
  sectionTitle = routes.home.title;

  changeLang(e) {
    this.$['app/currentLang'] = e.target.value;
  }

  setTitle() {
    this.$.sectionTitle = this.$[`l10n/${this.$['router/title']}`] || 
      this.$['router/title'] || 
      routes.home.title;
  }

  renderCallback() {
    this.sub('router/title', () => this.setTitle());
    this.sub('app/currentLang', () => this.setTitle());
  }
}

AppShell.rootStyles = styles;
AppShell.template = template;

AppShell.reg('app-shell');