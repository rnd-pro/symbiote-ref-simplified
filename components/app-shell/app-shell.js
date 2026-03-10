import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

export default class AppShell extends Symbiote {
  isoMode = true;
  sectionHtml = /*html*/ `<home-section></home-section>`;
  sectionTitle = '';

  changeLang(e) {
    this.$['app/currentLang'] = e.target.value;
  }

  setTitle() {
    this.$.sectionTitle = this.$[`l10n/${this.$['router/title']}`] || this.$['router/title'] || '';
  }

  renderCallback() {
    this.sub('app/currentLang', () => this.setTitle());
    this.sub('router/title', () => this.setTitle());
    this.sub('router/route', (route) => {
      this.$.sectionHtml = /*html*/ `<${route}-section></${route}-section>`;
    }, false);
  }
}

AppShell.rootStyles = styles;
AppShell.template = template;

AppShell.reg('app-shell');