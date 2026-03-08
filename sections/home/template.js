import { html } from '@symbiotejs/symbiote';

export default html`
  <section>
    <h1 ${{textContent: 'l10n/Home'}}></h1>
    <todo-list></todo-list>
    <client-only></client-only>
    <server-only></server-only>
  </section>
`;