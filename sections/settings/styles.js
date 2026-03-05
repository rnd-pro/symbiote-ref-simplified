import { css } from '@symbiotejs/symbiote';

export default css`
settings-section {
  section {
    padding: var(--gap-max);

    .setting-row {
      display: flex;
      align-items: center;
      gap: var(--gap-max);
      padding: var(--gap-max);
      background: var(--bg-light);
      border-radius: 8px;
      margin-top: var(--gap-max);

      label {
        font-weight: 600;
        min-width: 80px;
      }
    }

    button[toggle] {
      position: relative;
      display: flex;
      height: var(--ui-size);
      width: var(--ui-size);
      border-radius: 100%;
      cursor: pointer;
      background: transparent;
      color: var(--text-color);
      transition: transform .3s;
      border: 2px solid currentColor;
      overflow: hidden;

      &::before {
        position: absolute;
        content: '';
        display: block;
        height: 100%;
        width: 50%;
        top: 0;
        left: 0;
        background: currentColor;
      }
    }
  }
}

.light-theme settings-section button[toggle] {
  transform: rotate(180deg);
}
`;
