import { html } from '@symbiotejs/symbiote';

export default html`
<nav>
  <ul>
    <li><a href="#" ${{textContent: 'l10n/home'}}></a></li>
    <li><a href="#" ${{textContent: 'l10n/about'}}></a></li>
    <li><a href="#" ${{textContent: 'l10n/contact'}}></a></li>
  </ul>
</nav>
`;
