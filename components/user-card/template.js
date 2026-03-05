import { html } from '@symbiotejs/symbiote';

export default html`
<div class="avatar">
  <i-con ${{'@name': 'avatar'}}></i-con>
</div>
<div class="info">
  <span class="name" ${{textContent: 'name'}}></span>
  <span class="role" ${{textContent: 'role'}}></span>
</div>
`;
