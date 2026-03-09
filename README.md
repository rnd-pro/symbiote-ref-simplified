# Symbiote.js — Isomorphic App Reference

> **SSR streaming → hydration → SPA** — all in one ~6 KB library, zero build tools, pure ESM.
>
> This reference app shows how [Symbiote.js](https://github.com/symbiotejs/symbiote.js) delivers isomorphic/hybrid rendering with native import maps, reactive state across components, and Shadow DOM that works seamlessly with SSR — things that usually require heavy frameworks and complex toolchains.

LIVE DEMO: https://rnd-pro.github.io/symbiote-ref-simplified/

> **Note:** The demo uses client-side routing with History API, so direct sub-page links will return 404 on GitHub Pages. Navigate from the home page instead.

## Quick start

```bash
npm install
npm run dev       # SSR streaming server at http://localhost:3000
```

Static generation (open `dist/index.html` directly):
```bash
npm run ssr       # generates dist/index.html
```

## Features demonstrated

| Feature | Where | Key API |
|---------|-------|---------|
| **SSR streaming** | `node/server.js` | `SSR.renderToStream()` |
| **Isomorphic hydration** | most components | `isoMode = true` |
| **Server-only rendering** | `server-only` | Only imported in `node-imports.js` (no JS on client) |
| **Client-only rendering** | `client-only` | Only imported in `browser-imports.js` (no SSR output) |
| **Shadow DOM (isomorphic)** | `shadow-dom` | `shadowStyles`, `<slot>` content, SSR-compatible |
| **Named data context** | `app/app.js`, `app/l10n.js` | `PubSub.registerCtx({}, 'app')` |
| **Shared data context** | `shared-ctx` | `*sharedText`, `ctx="my-ctx"` |
| **Dynamic routing** | `app/router.js` | `AppRouter.initRoutingCtx()` |
| **Lazy section loading** | `app-shell.js` | `await import(…)` on route change |
| **Itemize API** | `todo-list`, `dashboard` | `itemize="app/toDoList"`, `item-tag` |
| **Pop-up bindings** | `todo-list` | `^toggleItem`, `^removeItem` in `init$` |
| **Computed properties** | `i-con` | `'+path': () => ICONS[this.$['@name']]` |
| **Dynamic localization** | `app/l10n.js` | `PubSub.registerCtx({}, 'l10n')` |
| **Theme switching** | `settings` section | CSS class toggle on `:root` |
| **Icon system** | `i-con` component | SVG paths with attribute binding `@d` |
| **Section transitions** | `globals.css` | `@starting-style` fade-in |

## Repo structure

```
sym-article/
├── app/                        # Application-level modules
│   ├── app.js                  # Named context 'app' (shared state)
│   ├── iso.js                  # Isomorphic imports (used by both SSR & browser)
│   ├── l10n.js                 # Localization (en / es / ru)
│   └── router.js               # Route definitions + context 'router'
│
├── components/                 # Reusable web components
│   ├── app-shell/              # Main layout (header, nav, main, footer)
│   ├── nav-menu/               # Sidebar navigation
│   ├── i-con/                  # SVG icon — computed prop `+path`, attribute binding `@name`
│   ├── todo-list/              # Itemize API demo — pop-up bindings `^prop` in init$
│   ├── user-card/              # Card component for dashboard items
│   ├── shadow-dom/             # Isomorphic Shadow DOM + slot content
│   ├── shared-ctx/             # Shared data context demo (`*prop`, `ctx` attr)
│   ├── server-only/            # Rendered on server, inert in browser
│   └── client-only/            # Rendered in browser only (live data, mouse tracking)
│
├── sections/                   # Route-loaded page sections
│   ├── home/                   # Home page (all component demos)
│   ├── dashboard/              # User cards grid via Itemize + item-tag
│   └── settings/               # Theme toggle (dark ↔ light)
│
├── dist/                       # Static assets & generated output
│   ├── globals.css             # Design tokens + theme overrides
│   ├── browser-imports.js      # Client-side entry (iso.js + client-only)
│   └── index.html              # SSR-generated static page
│
├── node/                       # Server-side
│   ├── server.js               # SSR streaming dev server
│   ├── ssr.js                  # Static HTML generator
│   ├── main-tpl.html           # HTML template with {{CONTENT}} slot
│   └── node-imports.js         # SSR component imports (iso.js + server-only)
│
├── AI_REFERENCE.md             # Patterns & anti-patterns for AI agents
├── tsconfig.json               # JSDoc type checking config
└── package.json
```

## Architecture

```
                  ┌─────────────┐
                  │ main-tpl.html│  HTML shell with importmap
                  └──────┬──────┘
                         │
           ┌─────────────┼─────────────┐
           ▼                           ▼
   npm run ssr                  npm run dev
   (static gen)              (streaming server)
           │                           │
           ▼                           ▼
  SSR.processHtml()         SSR.renderToStream()
           │                           │
           ▼                           ▼
  dist/index.html               HTTP response
  (open directly)            (localhost:3000)
           │                           │
           └───────────┬───────────────┘
                       ▼
              Browser hydration
              (isoMode = true)
```

**Isomorphic / Server-only / Client-only split:**
- **`iso.js`** — components shared between server and browser (app-shell, todo-list, shadow-dom, shared-ctx, …)
- **`node-imports.js`** — `iso.js` + `server-only` (rendered on server, no JS shipped to client)
- **`browser-imports.js`** — `iso.js` + `client-only` (rendered in browser, invisible to SSR)

**SSR → Hydration flow:**
1. Server renders components to HTML (with `bind=` attributes preserved)
2. Browser loads `browser-imports.js` → `iso.js` → registers all browser components
3. Components detect existing children → `isoMode` activates `ssrMode` (skip template, bind to existing DOM)
4. Client-side state mutations update DOM reactively

## Key patterns

### Application state via named context

```javascript
// app/app.js — register once
PubSub.registerCtx({ darkTheme: true, toDoList: [...] }, 'app');

// Any component — read/write/subscribe
this.$['app/darkTheme'] = false;
this.sub('app/toDoList', (items) => { ... });
```

### Itemize with custom item-tag and pop-up binding `^prop`

```html
<div itemize="app/toDoList" item-tag="list-item">
  <template>
    <input type="checkbox" ${{checked: 'done', onchange: '^toggleItem'}}>
    <span ${{textContent: 'text'}}></span>
  </template>
</div>
```

Handlers bound with `^` (pop-up binding) must be defined in the parent's `init$`, not as class methods.

### Computed properties `+prop` and attribute binding `@prop`

```javascript
// i-con component — computed property depends on @name attribute
init$ = {
  '@name': 'home',
  '+path': () => ICONS[this.$['@name']] || ICONS.home,
}
```
```html
<svg viewBox="0 0 24 24">
  <path ${{@d: '+path'}}></path>
</svg>
```

`+path` recomputes automatically whenever `name` attribute changes.

### Shared data context `*prop`

Two independent `<shared-ctx>` instances share state when given the same `ctx` attribute — no global store, no prop drilling:

```html
<shared-ctx ctx="my-ctx"></shared-ctx>
<shared-ctx ctx="my-ctx"></shared-ctx>
```
```javascript
init$ = {
  '*sharedText': 'Initial text',
  onTextInput: (e) => {
    this.$['*sharedText'] = e.target.value;
  },
}
```

Typing in one textarea updates the other instantly.

### Shadow DOM with isomorphic SSR

```javascript
class ShadowDom extends Symbiote {
  isoMode = true;
  // ...
}
ShadowDom.shadowStyles = styles;  // scoped styles via Shadow DOM
ShadowDom.template = template;
```

Light DOM children (slot content) and Shadow DOM work together — and both survive the SSR → hydration round-trip.

## Scope

> This is a reference app for educational purposes. It intentionally leaves out production concerns like bundling/minification, index-based lazy-loaded localization maps, multi-route asset generation, and a complete CSP setup.

## Dependencies

| Package | Purpose |
|---------|---------|
| `@symbiotejs/symbiote` | Web component library (~6 KB) |
| `linkedom` | DOM implementation for SSR, peer dependency |

Zero frontend build tools. Pure ESM. Native import maps.

## License

MIT

&copy; 2026 rnd-pro.com
