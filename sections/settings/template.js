import { html } from '@symbiotejs/symbiote';

export default html`
<section>
  <h1 ${{textContent: 'l10n/Settings'}}></h1>

  <div class="setting-row">
    <label ${{textContent: 'l10n/Theme'}}></label>
    <button toggle ${{onclick: 'onToggleTheme'}}></button>
  </div>
</section>
`;
