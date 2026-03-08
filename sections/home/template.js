import { html } from '@symbiotejs/symbiote';

export default html`
  <section>
    <h1 ${{textContent: 'l10n/Home'}}></h1>
    <server-only ${{'@caption': 'l10n/Server only'}}></server-only>
    <client-only ${{'@caption': 'l10n/Client only'}}></client-only>
    <todo-list ${{'@caption': 'l10n/Isomorphic'}}></todo-list>
  </section>
`;