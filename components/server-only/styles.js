import { css } from '@symbiotejs/symbiote';

export default css`
server-only {
  display: block;
  padding: var(--gap-max);
  margin-bottom: var(--gap-max);
  border: 1px solid currentColor;
  border-radius: var(--radius-mid);

  .info-grid {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: var(--gap-min) var(--gap-max);

    [label] {
      font-weight: 600;
      opacity: 0.7;
    }
  }

  .hint {
    margin-top: var(--gap-mid);
    font-size: 0.85em;
    opacity: 0.5;
    font-style: italic;
  }
}
`;
