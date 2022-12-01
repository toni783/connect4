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
  } else if (value === Players.PLAYER_2) {
    color = "yellowCircle";
  }

  return (
    <td>
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
