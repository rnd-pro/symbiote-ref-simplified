import { html } from '@symbiotejs/symbiote';

export default html`
<header>
  <div class="logo">
    <img src="https://rnd-pro.com/svg/symbiote/index.svg" alt="Symbiote.js" width="36">
    <span ${{textContent: 'app/appTitle'}}></span>
  </div>
  <span ${{textContent: '+sectionTitle'}}></span>
  <select ${{onchange: 'changeLang'}}>
    <option value="en">English</option>
    <option value="es">Español</option>
    <option value="ru">Русский</option>
  </select>
</header>
<nav-menu></nav-menu>
<main ${{innerHTML: '+sectionHtml'}}></main>
<footer>
  <span>&copy; ${new Date().getFullYear()}</span>
  <a href="https://rnd-pro.com" target="_blank">rnd-pro.com</a>
</footer>
`;