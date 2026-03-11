import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

export default class AppShell extends Symbiote {
  isoMode = true;
  init$ = {
    '+sectionTitle': {
      deps: ['router/title', 'app/currentLang'],
      fn: () => this.$[`l10n/${this.$['router/title']}`] || this.$['router/title'] || '',
    },
    '+sectionHtml': {
      deps: ['router/route'],
      fn: () => /*html*/ `<${this.$['router/route']}-section></${this.$['router/route']}-section>`,
    }
  }

  changeLang(e) {
    this.$['app/currentLang'] = e.target.value;
  }
}

AppShell.rootStyles = styles;
AppShell.template = template;

AppShell.reg('app-shell');