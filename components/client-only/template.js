import { html } from '@symbiotejs/symbiote';

export default html`
<div class="info-grid">
  <div label>Viewport</div>
  <div ${{textContent: 'viewport'}}></div>

  <div label>Current time</div>
  <div ${{textContent: 'currentTime'}}></div>

  <div label>Mouse position</div>
  <div ${{textContent: 'mousePos'}}></div>
</div>
<p class="hint">This component only runs in the browser — it does not exist in the SSR output. View the page source to confirm.</p>
`;
