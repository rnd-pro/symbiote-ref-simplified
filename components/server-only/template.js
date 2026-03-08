import { html } from '@symbiotejs/symbiote';

// This HTML was generated on the server and stays inert in the browser — no JS runs for this component on the client.
// Will disappear after section reload (SPA navigation)

// Use direct text-node bindings for serer-only case:
export default html`
<div class="info-grid">
  <div label>Rendered at</div>
  <div>{{renderedAt}}</div>

  <div label>Node.js</div>
  <div>{{nodeVersion}}</div>

  <div label>SSR engine</div>
  <div>{{ssrEngine}}</div>
</div>
`;
