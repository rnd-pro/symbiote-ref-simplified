import { html } from '@symbiotejs/symbiote';

export default html`
<textarea ${{value: '*sharedText', oninput: 'onTextInput'}}></textarea>
`;