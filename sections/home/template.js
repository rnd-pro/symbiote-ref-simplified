import { html } from '@symbiotejs/symbiote';

export default html`
  <section>
    <h1 ${{textContent: 'l10n/Home'}}></h1>
    <client-only ${{'@caption': 'l10n/Client only'}}></client-only>
    <server-only ${{'@caption': 'l10n/Server only'}}></server-only>
    <todo-list></todo-list>
  </section>
`;