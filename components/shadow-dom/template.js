import { html } from '@symbiotejs/symbiote';

export default html`
 <slot></slot>
 <button ${{onclick: 'onShadowClick'}}>
  <i-con name="ok"></i-con>
  <span ${{textContent: 'l10n/Shadow button'}}></span>
 </button>
`;