import { css } from '@symbiotejs/symbiote';

export default css`
app-shell {
  display: grid;
  grid-template-columns: 200px auto;
  grid-template-rows: auto 1fr auto;
  grid-template-areas: 
    "header header"
    "nav main"
    "footer footer";
  height: 100vh;
  max-height: 100vh;
  width: 100vw;

  header {
    grid-area: header;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--gap-max);
    padding: var(--gap-mid);
    padding-left: var(--gap-max);
    padding-right: var(--gap-max);
    background-color: var(--bg-light);

    .logo {
      display: flex;
      align-items: center;
      gap: var(--gap-mid);
    }
  }

  nav-menu {
    grid-area: nav;
  }

  main {
    display: block;
    overflow: auto;
    height: 100%;
    max-height: 100%;
    width: 100%;
    max-width: 100%;
  }

  footer {
    grid-area: footer;
    padding: var(--gap-mid);
    background-color: var(--bg-light);
  }
}
`;