import { css } from '@symbiotejs/symbiote';

export default css`
dashboard-section {
  section {
    padding: var(--gap-max);

    .subtitle {
      opacity: 0.5;
      margin-bottom: var(--gap-max);
    }

    .cards {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
      gap: var(--gap-max);
    }

    .selection {
      margin-top: var(--gap-max);
      padding: var(--gap-mid);
      font-style: italic;
      opacity: 0.6;
    }
  }
}
`;
