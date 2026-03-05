import { html } from '@symbiotejs/symbiote';

export default html`
<section>
  <h1 ${{textContent: 'l10n/Dashboard'}}></h1>
  <div 
    class="cards"
    itemize="users"
    item-tag="user-card"
    ${{onclick: 'onCardClick'}}></div>
  <div class="selection" ${{textContent: 'selectedUser'}}></div>
</section>
`;
