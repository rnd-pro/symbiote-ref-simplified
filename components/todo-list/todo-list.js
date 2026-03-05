import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

export default class TodoList extends Symbiote {
  isoMode = true;
  inputValue = '';
  init$ = {
    // Methods accessible with ^methodName schema from nested components
    toggleItem: (e) => {
      let idx = [...this.ref.list.children].indexOf(e.target.closest('list-item'));
      if (idx === -1) return;
      this.$['app/toDoList'] = this.$['app/toDoList'].map((item, i) =>
        i === Number(idx) ? { ...item, done: !item.done } : item
      );
    },

    removeItem: (e) => {
      let idx = [...this.ref.list.children].indexOf(e.target.closest('list-item'));
      if (idx === -1) return;
      this.$['app/toDoList'] = this.$['app/toDoList'].filter((_, i) => i !== Number(idx));
    }
  };

  onInput(e) {
    this.$.inputValue = e.target.value;
  }

  addItem() {
    let text = this.$.inputValue.trim();
    if (!text) return;
    this.$['app/toDoList'] = [...this.$['app/toDoList'], { text, done: false }];
    this.$.inputValue = '';
  }

  onKeydown(e) {
    if (e.key === 'Enter') this.addItem();
  }

}

TodoList.rootStyles = styles;
TodoList.template = template;

TodoList.reg('todo-list');
