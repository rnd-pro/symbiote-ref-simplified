import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';
import '../../components/todo-list/todo-list.js';

export default class HomeSection extends Symbiote {
  isoMode = true;
}

HomeSection.rootStyles = styles;
HomeSection.template = template;

HomeSection.reg('home-section');