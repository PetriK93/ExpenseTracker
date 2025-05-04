import styles from "./HistoryBar.styles.module.css";

const HistoryBar = ({ description, amount }) => {
  return (
    <div
      className={`${styles.history_bar} ${
        amount.startsWith("-") ? styles.negative : styles.positive
      }`}
    >
      <p className={styles.payment}>{description}</p>
      <p className={styles.payment_amount}>{amount}€</p>
    </div>
  );
};

export default HistoryBar;
