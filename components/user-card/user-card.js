import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

export default class UserCard extends Symbiote {
  isoMode = true;
  name = 'User';
  role = 'Member';
  avatar = 'star';
  roleText = '';

  renderCallback() {
    let updateRole = () => {
      this.$.roleText = this.$[`l10n/${this.$.role}`] || this.$.role;
    };
    this.sub('role', updateRole);
    this.sub('app/currentLang', updateRole);
  }
}

UserCard.rootStyles = styles;
UserCard.template = template;

UserCard.reg('user-card');
