import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';
import styles from './styles.js';

// This component only runs in the browser — it does not exist in the SSR output. 
// View the page source to confirm.
export default class ClientOnly extends Symbiote {

  viewport = `${window.innerWidth} × ${window.innerHeight}`;
  currentTime = new Date().toLocaleTimeString();
  mousePos = '—';

  /** @type {ReturnType<typeof setInterval>} */
  #timer;

  #onMove = (/** @type {MouseEvent} */ e) => {
    this.$.mousePos = `${e.clientX}, ${e.clientY}`;
  };

  renderCallback() {
    this.#timer = setInterval(() => {
      this.$.currentTime = new Date().toLocaleTimeString();
    }, 1000);

    window.addEventListener('mousemove', this.#onMove);
  }

  destroyCallback() {
    clearInterval(this.#timer);
    window.removeEventListener('mousemove', this.#onMove);
  }
}

ClientOnly.rootStyles = styles;
ClientOnly.template = template;

ClientOnly.reg('client-only');
