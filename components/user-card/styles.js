import { css } from '@symbiotejs/symbiote';

export default css`
user-card {
  display: flex;
  gap: var(--gap-max);
  align-items: center;
  padding: var(--gap-max);
  background: var(--bg-light);
  border-radius: 8px;
  opacity: 1;
  transition: opacity 0.3s, transform 0.3s;

  @starting-style {
    opacity: 0;
    transform: scale(0.95);
  }

  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--bg-dark);
    font-size: 24px;
    color: var(--accent-color);
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: var(--gap-min);

    .name {
      font-weight: 600;
    }

    .role {
      font-size: 0.85em;
      opacity: 0.6;
    }
  }
}
`;
