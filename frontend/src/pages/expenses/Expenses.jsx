import styles from "./Expenses.styles.module.css";
import BigButton from "../../components/bigButton/BigButton";

const Expenses = () => {
  const handleClick = () => {
    console.log("I was clicked!");
  };

  return (
    <div className={styles.main_container}>
      <h1 className={styles.title}>Expense Tracker</h1>
      <div className={styles.balance_container}>
        <h2 className={styles.balance}>Your Balance</h2>
        <p className={styles.balance_amount}>1500€</p>
      </div>
      <div className={styles.income_expense_container}>
        <div className={styles.income_container}>
          <h3 className={styles.income_expense}>Income</h3>
          <p className={styles.income_amount}>1300€</p>
        </div>
        <div className={styles.expense_container}>
          <h3 className={styles.income_expense}>Expense</h3>
          <p className={styles.expense_amount}>200€</p>
        </div>
      </div>
      <div className={styles.content_container}>
        <h2 className={styles.sub_section}>History</h2>
      </div>
      <div className={styles.content_container}>
        <h2 className={styles.sub_section}>Add new transaction</h2>
      </div>
      <div className={styles.input_group}>
        <label htmlFor="description">Description of product or service</label>
        <input
          type="text"
          id="description"
          name="description"
          spellCheck="false"
        />
      </div>
      <div className={styles.input_group}>
        <label htmlFor="amount">Amount</label>
        <input type="number" id="amount" name="amount" />
      </div>
      <BigButton onClick={handleClick}>Add transaction</BigButton>
    </div>
  );
};

export default Expenses;
