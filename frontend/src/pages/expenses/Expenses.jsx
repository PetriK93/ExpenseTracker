import { useState } from "react";
import styles from "./Expenses.styles.module.css";
import BigButton from "../../components/bigButton/BigButton";
import HistoryBar from "../../components/historyBar/HistoryBar";

const Expenses = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;

    if (newValue.length <= 7) {
      setValue(newValue);
    }
  };

  const handleClick = () => {
    console.log("I was clicked!");
  };

  return (
    <div className={styles.main_container}>
      <h1 className={styles.title}>Expense Tracker</h1>
      <div className={styles.balance_container}>
        <h2 className={styles.balance}>Your balance:</h2>
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
      <div className={styles.history_container}>
        <HistoryBar></HistoryBar>
        <HistoryBar></HistoryBar>
        <HistoryBar></HistoryBar>
        <HistoryBar></HistoryBar>
      </div>
      <div className={styles.content_container}>
        <h2 className={styles.sub_section}>Add a new transaction</h2>
      </div>
      <div className={styles.input_group}>
        <label htmlFor="description">
          Description of product or service<br></br>(25 characters limit)
        </label>
        <input
          type="text"
          id="description"
          name="description"
          spellCheck="false"
          maxLength={25}
          placeholder="Food for celebration"
        />
      </div>
      <div className={styles.input_group}>
        <label htmlFor="amount">
          Amount<br></br>(7 numbers limit)
        </label>
        <input
          value={value}
          type="number"
          id="amount"
          name="amount"
          onChange={handleChange}
          placeholder="550€"
        />
      </div>
      <BigButton onClick={handleClick}>Add transaction</BigButton>
    </div>
  );
};

export default Expenses;
