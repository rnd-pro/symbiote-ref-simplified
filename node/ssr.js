import { SSR } from '@symbiotejs/symbiote/node/SSR.js';
import fs from 'fs';

// patches globals with linkedom env
await SSR.init();

// Import components for node runtime:
await import('./node-imports.js');

let html = await SSR.processHtml('<app-shell></app-shell>');
// cleanup globals
SSR.destroy();

const template = fs.readFileSync('./node/mein-tpl.html', 'utf-8');
html = template.replace('{{CONTENT}}', html);
fs.writeFileSync('./dist/index.html', html);
