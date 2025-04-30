import styles from "./HistoryBar.styles.module.css";

const HistoryBar = () => {
  return (
    <div className={styles.history_bar}>
      <p className={styles.payment}>Payment</p>
      <p className={styles.payment_amount}>150€</p>
    </div>
  );
};

export default HistoryBar;
