import { html } from '@symbiotejs/symbiote';

export default html`
<div class="input-row">
  <input
    type="text"
    ${{
      oninput: 'onInput',
      onkeydown: 'onKeydown',
      value: 'inputValue',
      '@placeholder': 'l10n/Add a task...'
    }}>
  <button ${{onclick: 'addItem'}}><i-con name="plus"></i-con></button>
</div>
<div itemize="app/toDoList" item-tag="list-item" ref="list" class="list">
  <template>
    <div label>
      <input type="checkbox" ${{checked: 'done', onchange: '^toggleItem'}}>
      <span ${{textContent: 'text'}}></span>
    </div>
    <button ${{onclick: '^removeItem'}}><i-con name="close"></i-con></button>
  </template>
</div>
`;
