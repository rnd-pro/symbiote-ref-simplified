import { css } from '@symbiotejs/symbiote';

export default css`
server-only {
  display: inline-block;
  .info-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--gap-min) var(--gap-max);

    [label] {
      font-weight: 600;
      opacity: 0.7;
    }
  }
}
`;
