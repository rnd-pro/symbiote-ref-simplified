import { html } from '@symbiotejs/symbiote';

export default html`
<nav ref="nav" ${{onclick: 'onNav'}}>
  <a href="./" route="home">
    <i-con name="home"></i-con>
    <span ${{textContent: 'l10n/Home'}}></span>
  </a>
  <a href="./dashboard/" route="dashboard">
    <i-con name="dashboard"></i-con>
    <span ${{textContent: 'l10n/Dashboard'}}></span>
  </a>
  <a href="./settings/" route="settings">
    <i-con name="settings"></i-con>
    <span ${{textContent: 'l10n/Settings'}}></span>
  </a>
</nav>
`;
