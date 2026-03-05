import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';
import '../../sections/home/home-section.js';

export default class AppShell extends Symbiote {
  isoMode = true;
  sectionHtml = `<home-section></home-section>`;
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
    this.sub('router/route', async (route) => {
      this.$.sectionHtml = 'Loading...';
      await import(`../../sections/${route}/${route}-section.js`);
      this.$.sectionHtml = `<${route}-section></${route}-section>`;
    }, false);
  }
}

AppShell.rootStyles = styles;
AppShell.template = template;

AppShell.reg('app-shell');