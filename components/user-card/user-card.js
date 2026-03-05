import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

export default class UserCard extends Symbiote {
  isoMode = true;
  name = 'User';
  role = 'Member';
  avatar = 'star';
}

UserCard.rootStyles = styles;
UserCard.template = template;

UserCard.reg('user-card');
