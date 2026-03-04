import { html } from '@symbiotejs/symbiote';

export default html`
<nav>
  <a href="#" ${{textContent: 'l10n/home'}}></a>
  <a href="#" ${{textContent: 'l10n/about'}}></a>
  <a href="#" ${{textContent: 'l10n/contact'}}></a>
</nav>
`;
