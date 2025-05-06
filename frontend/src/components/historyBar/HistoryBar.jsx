import styles from "./HistoryBar.styles.module.css";

const HistoryBar = ({ description, amount, onDelete }) => {
  return (
    <div
      className={`${styles.history_bar} ${
        amount.startsWith("-") ? styles.negative : styles.positive
      }`}
    >
      <span className={styles.delete_button} onClick={onDelete}>
        ❌
      </span>
      <p className={styles.payment}>{description}</p>
      <p className={styles.payment_amount}>{amount}€</p>
    </div>
  );
};

export default HistoryBar;
