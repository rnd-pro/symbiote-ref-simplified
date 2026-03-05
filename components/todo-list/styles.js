import { css } from '@symbiotejs/symbiote';

export default css`
todo-list {
  display: block;
  max-width: 480px;

  .input-row {
    display: flex;
    gap: var(--gap-mid);
    margin-bottom: var(--gap-max);

    input {
      flex: 1;
      padding: var(--gap-mid);
      border: 1px solid var(--bg-light);
      border-radius: 4px;
      background: var(--bg-dark);
      color: var(--text-color);
      font-size: inherit;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--ui-size);
      width: var(--ui-size);
      border: none;
      border-radius: 100%;
      background: var(--accent-color);
      color: #fff;
      font-size: 1.2em;
      cursor: pointer;
    }
  }

  .list {
    display: flex;
    flex-direction: column;
    gap: var(--gap-mid);
  }

  list-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--gap-mid);
    background: var(--bg-light);
    border-radius: 4px;
    opacity: 1;
    transition: opacity 0.3s, transform 0.3s;

    [label] {
      display: flex;
      align-items: center;
      gap: var(--gap-mid);
      cursor: pointer;
    }

    @starting-style {
      opacity: 0;
      transform: translateY(10px);
    }

    &[leaving] {
      opacity: 0;
      transform: translateX(-20px);
    }

    input[type="checkbox"]:checked + span {
      text-decoration: line-through;
      opacity: 0.5;
    }

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      height: var(--ui-size);
      width: var(--ui-size);
      border: none;
      background: none;
      color: var(--text-color);
      opacity: 0.4;
      cursor: pointer;
      font-size: 1em;

      &:hover {
        opacity: 1;
      }
    }
  }
}
`;
