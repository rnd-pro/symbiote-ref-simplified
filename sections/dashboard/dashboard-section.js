import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';
import '../../components/user-card/user-card.js';

export default class DashboardSection extends Symbiote {
  isoMode = true;
  users = [
    { name: 'Alex', role: 'Admin', avatar: 'star' },
    { name: 'Maria', role: 'Editor', avatar: 'ok' },
    { name: 'Sam', role: 'Viewer', avatar: 'home' },
  ];
  selectedUser = '';
  onCardClick(e) {
    let card = e.target.closest('user-card');
    if (!card) return;
    this.$.selectedUser = card.$?.name || '';
  };
}

DashboardSection.rootStyles = styles;
DashboardSection.template = template;

DashboardSection.reg('dashboard-section');
