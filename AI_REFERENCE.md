# Symbiote.js — AI Agent Reference

> Patterns and anti-patterns extracted from real corrections.
> Use this document to avoid common mistakes when generating Symbiote.js code.

---

## 1. `init$` vs Class Properties

`init$` is the **mainstream workflow** for declaring reactive state and methods. Class properties serve as **fallbacks** — if an `init$` property is not found, Symbiote falls back to a class property with the same name. This is useful for reducing boilerplate in simple components.

### Rule
- **`init$`** — the primary way to declare reactive state and methods. Required for `^` bubbling handlers in itemized children.
- **Class properties** — fallback shorthand for simple components where `init$` would be unnecessarily verbose.

### `^` Bubbling requires `init$`
The `^` prefix resolution mechanism looks up the parent component's **state context** (`init$`), not its class prototype. A class method like `toggleItem()` won't be found by `^toggleItem` in an item template.

```javascript
// ✅ CORRECT — bubbling handlers in init$
export default class TodoList extends Symbiote {
  inputValue = '';  // simple fallback — no init$ needed for this
  init$ = {
    toggleItem: (e) => { /* ... */ },   // ^toggleItem accessible from items
    removeItem: (e) => { /* ... */ },   // ^removeItem accessible from items
  };
  onInput(e) { /* ... */ }   // own handler → class method is fine
  addItem() { /* ... */ }    // own handler → class method is fine
}

// ❌ WRONG — class methods won't resolve via ^ from itemized children
export default class TodoList extends Symbiote {
  init$ = { inputValue: '', todoItems: [] };
  toggleItem(e) { /* unreachable via ^toggleItem */ }
}
```

### Class properties as fallback (simple components)
For simple components that don't need `^` or complex state, class properties reduce boilerplate:

```javascript
// ✅ Simple component — class properties as fallback
export default class UserCard extends Symbiote {
  isoMode = true;
  name = 'User';
  role = 'Member';
  avatar = 'star';
}

// ✅ Complex component — init$ is the mainstream way
export default class DashboardSection extends Symbiote {
  init$ = {
    users: [{ name: 'Alex', role: 'Admin', avatar: 'star' }],
    selectedUser: '',
  };
}
```

---

## 2. Attribute Binding: `@` Prefix

When binding to an **HTML attribute** (not a JS property), use the `@` prefix in binding syntax.

```javascript
// ✅ CORRECT — name is an HTML attribute on i-con
html`<i-con ${{'@name': 'avatar'}}></i-con>`

// ❌ WRONG — without @ it tries to set a JS property
html`<i-con ${{name: 'avatar'}}></i-con>`

// ✅ CORRECT — placeholder is an HTML attribute
html`<input ${{'@placeholder': 'l10n/Add a task...'}}>`

// `!` and `!!` are for type casting to boolean, not needed if property is already boolean
html`<div ${{'@hidden': '!showElement'}}></div>`  // cast string → boolean
html`<div ${{'@hidden': 'isHidden'}}></div>`      // already boolean — no ! needed
```

**Remember**: `@` is for binding syntax only. Don't use it to set static attributes in regular HTML.

---

## 3. Itemize and Data Contexts

Itemize can bind to **any type of data context** — local, named, parent, shared, or computed.

### Property prefix reference
| Prefix | Type | Example | Description |
|--------|------|---------|-------------|
| _(none)_ | Local | `propName` | Component's own state |
| `^` | Parent | `^parentProp` | Walk up DOM to nearest ancestor with this prop in its `init$` |
| `KEY/` | Named | `app/toDoList` | Global named context (via `PubSub.registerCtx`) |
| `*` | Shared | `*sharedProp` | Shared context scoped by `ctx` attribute or `--ctx` CSS |
| `+` | Computed | `+sum` | Auto-tracked function, recalculated when deps change |
| `--` | CSS Data | `--my-css-var` | Read CSS custom property value |

### Itemize examples
```javascript
// Local state context
html`<div itemize="todoItems" item-tag="list-item"></div>`

// Named data context (e.g. 'app')
html`<div itemize="app/toDoList" item-tag="list-item"></div>`

// Parent state context
html`<div itemize="^parentItems" item-tag="list-item"></div>`
```

### When to use which
- **Named context** (`app/propName`): shared state across components, persists across route changes
- **Local** (`propName`): component-private data, resets on unmount
- **Parent** (`^propName`): delegating data from parent component
- **Shared** (`*propName`): components grouped by `ctx` attribute share this data (no parent needed)
- **Computed** (`+propName`): derived values that auto-update when dependencies change

---

## 4. Element References with `ref`

Use the `ref` attribute to get DOM element references instead of querying by attributes:

```javascript
// ✅ Template
html`<div itemize="app/toDoList" item-tag="list-item" ref="list"></div>`

// ✅ Access in component
let idx = [...this.ref.list.children].indexOf(e.target.closest('list-item'));
```

---

## 5. Accessing State Programmatically

The `^` prefix is for **template bindings only**. When accessing state programmatically in JS, use the property name directly:

```javascript
// ✅ CORRECT — direct property access in JS
this.$.selectedUser = card.$?.name || '';

// ❌ WRONG — ^ is template syntax, not for programmatic access
this.$['^selectedUser'] = card.$?.name || '';
```

---

## 6. CSS-Based Theming over JS Inline Styles

Use CSS classes on `:root`/`<html>` for theming, not `document.documentElement.style.setProperty()`.

```javascript
// ✅ CORRECT — toggle a CSS class
this.sub('app/darkTheme', (value) => {
  document.documentElement.classList.toggle('light-theme', !value);
});

// ❌ WRONG — setting individual CSS vars imperatively
for (let [prop, val] of Object.entries(THEMES[name])) {
  document.documentElement.style.setProperty(prop, val);
}
```

```css
/* ✅ Theme overrides via CSS class */
:root {
  --text-color: #fff;
  --bg-color: #323232;
}
.light-theme {
  --text-color: #1e1e1e;
  --bg-color: #e2e2e2;
}
```

### Boolean Flags for Binary State
Use booleans, not string enums:

```javascript
// ✅ Boolean toggle
darkTheme: true,

// ❌ String enum for binary choice
theme: 'dark',
```

---

## 7. Use `<i-con>` for Icons

Don't use text characters for icon buttons. Use the `<i-con>` component:

```html
<!-- ✅ CORRECT -->
<button ${{onclick: 'addItem'}}><i-con name="plus"></i-con></button>
<button ${{onclick: '^removeItem'}}><i-con name="close"></i-con></button>

<!-- ❌ WRONG -->
<button ${{onclick: 'addItem'}}>+</button>
<button ${{onclick: '^removeItem'}}>✕</button>
```

---

## 8. Design Tokens

Use CSS custom properties for consistent sizing. Don't hard-code sizes:

```css
:root {
  --ui-size: 38px;
}

button {
  height: var(--ui-size);
  width: var(--ui-size);
}
```

---

## 9. Attribute Selectors over Classes

Prefer HTML attributes over CSS classes for styling hooks when semantic:

```html
<!-- ✅ Attribute-based -->
<div label>...</div>
<button toggle>...</button>

<!-- Styled with -->
<!-- [label] { display: flex; } -->
<!-- button[toggle] { ... } -->
```

---

## 10. Section Transitions

Use `@starting-style` in global CSS for section enter animations:

```css
section {
  opacity: 1;
  transition: opacity .8s;

  @starting-style {
    opacity: 0;
  }
}
```

---

## 11. Don't Show "Loading..." Flash

For fast lazy-loaded sections (local imports), don't set intermediate "Loading..." text — it causes a visible flash:

```javascript
// ✅ CORRECT — just load and swap
this.sub('router/route', async (route) => {
  await import(`../../sections/${route}/${route}-section.js`);
  this.$.sectionHtml = `<${route}-section></${route}-section>`;
}, false);

// ❌ WRONG — causes visible flash
this.sub('router/route', async (route) => {
  this.$.sectionHtml = 'Loading...';  // flash!
  await import(`../../sections/${route}/${route}-section.js`);
  this.$.sectionHtml = `<${route}-section></${route}-section>`;
}, false);
```

---

## 12. Template Formatting

Keep binding objects multi-line when they have many properties:

```javascript
// ✅ Readable
html`<input
  type="text"
  ${{
    oninput: 'onInput',
    onkeydown: 'onKeydown',
    value: 'inputValue',
    '@placeholder': 'l10n/Add a task...'
  }}>`

// ❌ Cramped
html`<input type="text" placeholder="Add a task..." ${{oninput: 'onInput', onkeydown: 'onKeydown', value: 'inputValue'}}>`
```
