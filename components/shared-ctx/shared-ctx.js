import Symbiote from '@symbiotejs/symbiote';
import template from './template.js';

class SharedCtx extends Symbiote {
  isoMode = true;
  init$ = {
    '*sharedText': 'Initial text',
    onTextInput: (e) => {
      this.$['*sharedText'] = e.target.value;
    },
  }
}

SharedCtx.template = template;
SharedCtx.reg('shared-ctx');