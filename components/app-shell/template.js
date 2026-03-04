import { html } from '@symbiotejs/symbiote';

export default html`
<header>
  <span>Symbiote.js Iso-reference</span>
  <select ${{onchange: 'changeLang'}}>
    <option value="en">English</option>
    <option value="ru">Русский</option>
  </select>
</header>
<nav-menu></nav-menu>
<main ${{innerHTML: 'sectionHtml'}}></main>
<footer>
  <span>&copy; ${new Date().getFullYear()}</span>
  <a href="https://rnd-pro.com" target="_blank">rnd-pro.com</a>
</footer>
`;