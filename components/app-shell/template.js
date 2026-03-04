import { html } from '@symbiotejs/symbiote';

export default html`
<nav-menu></nav-menu>
<main ${{innerHTML: 'sectionHtml'}}></main>
`;