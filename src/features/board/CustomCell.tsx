import styles from "../../styles/Home.module.css";

export const Cell = ({ value, columnIndex, play }) => {
  let color = "whiteCircle";
  if (value === 1) {
    color = "redCircle";
  } else if (value === 2) {
    color = "yellowCircle";
  }

  return (
    <td>
      <div
        // justify="center"
        // align="center"
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
