import { html } from '@symbiotejs/symbiote';

export default html`
  <section>
    <h1 ${{textContent: 'l10n/Home'}}></h1>
    <server-only ${{'@caption': 'l10n/Server only'}}></server-only>
    <client-only ${{'@caption': 'l10n/Client only'}}></client-only>
    <shadow-dom ${{'@caption': 'l10n/Isomorphic Shadow DOM'}}>
      <p>This is Light DOM content (inside the slot).</p>
    </shadow-dom>
    <div ${{'@caption': 'l10n/Shared context'}}>
      <shared-ctx ctx="my-ctx"></shared-ctx>
      <shared-ctx ctx="my-ctx"></shared-ctx>
    </div>
    <todo-list ${{'@caption': 'l10n/Isomorphic'}}></todo-list>
  </section>
`;