import styles from "../../../styles/Home.module.css";
import { Players } from "../BoardTypes";

type CellProps = {
  value: Players;
  columnIndex: number;
  play: (columnIndex: number) => void;
};

export const Cell = ({ value, columnIndex, play }: CellProps) => {
  let color = "whiteCircle";

  if (value === Players.PLAYER_1) {
    color = "redCircle";
  } else if (value === Players.PLAYER_2 || value === Players.BOT) {
    color = "yellowCircle";
  }

  return (
    <td
      aria-label={`Connect4 ${
        value === Players.PLAYER_1
          ? "Red"
          : value === Players.PLAYER_2 || value === Players.BOT
          ? "Yellow"
          : "Empty"
      } Cell`}
    >
      <div
        className={styles.gameCell}
        onClick={() => {
          play(columnIndex);
        }}
      >
        <div className={styles[color]}></div>
      </div>
    </td>
  );
};
