import { css } from '@symbiotejs/symbiote';

export default css`
nav-menu {
  display: block;
  height: 100%;
  padding: var(--gap-max);
  background-color: var(--bg-dark);

  nav {
    display: block;
    height: 100%;
    
    ul {
      list-style: none;
    }

    ul li {
      display: inline-block;
    }

    ul li a {
      color: var(--text-color);
    }
  }
}
`;