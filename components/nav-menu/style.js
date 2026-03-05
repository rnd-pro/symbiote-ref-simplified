import { css } from '@symbiotejs/symbiote';

export default css`
nav-menu {
  display: block;
  height: 100%;
  padding: var(--gap-max);
  background-color: var(--bg-dark);

  nav {
    display: flex;
    flex-direction: column;
    gap: var(--gap-max);
  }

  a {
    display: flex;
    align-items: center;
    gap: var(--gap-mid);
    text-decoration: none;
  }
}
`;