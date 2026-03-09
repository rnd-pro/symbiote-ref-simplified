import { css } from '@symbiotejs/symbiote';

// This styles are isolated. So we need to provide Shadow DOM styles here.
export default css`
:host {
  display: block;

  button {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    height: var(--ui-size);
    padding-left: .6em;
    padding-right: 1em;
    border: none;
    border-radius: var(--radius-mid);
    background: var(--text-color);
    color: var(--bg-color);
    font-size: 1.2em;
    cursor: pointer;
    transition: .2s;

    &:hover {
      background-color: var(--accent-color);
      color: #fff;
    }

    i-con {
      display: inline-flex;
      margin-right: var(--gap-mid);
      height: 1em;
      width: 1em;

      svg {
        width: 100%;
        height: 100%;

        path {
          fill: currentColor;
        }
      }
    }
  }
}
`;