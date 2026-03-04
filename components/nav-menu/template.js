import { html } from '@symbiotejs/symbiote';

export default html`
<nav ref="nav" ${{onclick: 'onNav'}}>
  <a href="./" route="home" ${{textContent: 'l10n/Home'}}></a>
  <a href="./dashboard/" route="dashboard" ${{textContent: 'l10n/Dashboard'}}></a>
  <a href="./settings/" route="settings" ${{textContent: 'l10n/Settings'}}></a>
</nav>
`;
