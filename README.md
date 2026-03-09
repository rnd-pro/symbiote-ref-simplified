# Symbiote.js — Isomorphic App Reference

> A simplified reference app demonstrating **SSR streaming**, **client-side hydration**, and **application state management** with [Symbiote.js](https://github.com/symbiotejs/symbiote.js) — a ~6 KB web component library with zero dependencies.

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
| **Isomorphic hydration** | all components except `client-only` and `server-only` | `isoMode = true` |
| **Named data context** | `app/app.js`, `app/l10n.js`, `app/router.js` | `PubSub.registerCtx({}, 'app')` |
| **Dynamic routing** | `app/router.js` | `AppRouter.initRoutingCtx()` |
| **Lazy section loading** | `app-shell.js` | `await import(…)` on route change |
| **Itemize API** | `todo-list`, `dashboard` | `itemize="app/toDoList"`, `item-tag` |
| **Bubbling bindings** | `todo-list` | `^toggleItem`, `^removeItem` in `init$` |
| **Dynamic localization** | `app/l10n.js` | `PubSub.registerCtx({}, 'l10n')` |
| **Theme switching** | `settings` section | CSS class toggle on `:root` |
| **Icon system** | `i-con` component | SVG paths with attribute binding |
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
│   │   ├── app-shell.js        # isoMode, lazy route loading, lang switching
│   │   ├── template.js
│   │   └── styles.js
│   ├── nav-menu/               # Sidebar navigation
│   ├── i-con/                  # SVG icon component
│   ├── todo-list/              # Itemize API demo (add / toggle / remove)
│   │   ├── todo-list.js        # ^bubbling handlers in init$
│   │   ├── template.js         # itemize="app/toDoList" item-tag="list-item"
│   │   └── styles.js
│   └── user-card/              # Card component for dashboard items
│
├── sections/                   # Route-loaded page sections
│   ├── home/                   # Home page + todo-list
│   ├── dashboard/              # User cards grid via Itemize + item-tag
│   └── settings/               # Theme toggle (dark ↔ light)
│
├── dist/                       # Static assets & generated output
│   ├── globals.css             # Design tokens + theme overrides
│   ├── browser-imports.js      # Client-side entry point (imports iso.js)
│   └── index.html              # SSR-generated static page
│
├── node/                       # Server-side
│   ├── server.js               # SSR streaming dev server
│   ├── ssr.js                  # Static HTML generator
│   ├── main-tpl.html           # HTML template with {{CONTENT}} slot
│   └── node-imports.js         # SSR component imports
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

// Any component — read/write
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

Handlers accessible with `^` (floating binding) must be in the parent's `init$`, not class methods (fallbacks to class props are not working in this case).

### Computed properties `+prop` and attribute binding `@prop`

`i-con` component.

### Shared data context `*prop`

`shared-ctx` component.

## What is excluded (for simplicity)

> This is a reference app for educational purposes.

- Build step (bundling, minification)
- Localization maps optimization (index-based on-demand lazy loading)
- Asset generation for multiple routes (sections, server-side routing)
- Complete CSP setup

## Dependencies

| Package | Purpose |
|---------|---------|
| `@symbiotejs/symbiote` | Web component library (~6 KB) |
| `linkedom` | DOM implementation for SSR, peer dependency |

Zero frontend build tools. Pure ESM. Native import maps.

## License

MIT

&copy; 2026 rnd-pro.com
