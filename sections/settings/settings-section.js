import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

export default class SettingsSection extends Symbiote {
  isoMode = true;

  onToggleTheme() {
    this.$['app/darkTheme'] = !this.$['app/darkTheme'];
  }

  initCallback() {
    this.sub('app/darkTheme', (value) => {
      document.documentElement.classList.toggle('light-theme', !value);
    });
  }
}

SettingsSection.rootStyles = styles;
SettingsSection.template = template;

SettingsSection.reg('settings-section');
