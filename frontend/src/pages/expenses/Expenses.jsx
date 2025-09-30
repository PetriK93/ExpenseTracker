import { useState } from "react";
import styles from "./Expenses.styles.module.css";
import BigButton from "../../components/bigButton/BigButton";
import SmallButton from "../../components/smallButton/SmallButton";
import HistoryBar from "../../components/historyBar/HistoryBar";
import { v4 as uuidv4 } from "uuid";
import logo from "../../assets/expense_tracker_logo.png";

const Expenses = () => {
  // useStates
  const [showConfirm, setShowConfirm] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const totalBalance = Number(
    transactions
      .reduce((total, tx) => {
        const numericAmount = parseFloat(
          tx.amount.toString().replace(",", ".")
        );
        return total + numericAmount;
      }, 0)
      .toFixed(2)
  );

  let income = 0;
  let expenses = 0;

  transactions.forEach((tx) => {
    const amount = parseFloat(tx.amount.replace(",", ".")); // convert "12,50" → 12.5

    if (amount >= 0) {
      income += amount;
    } else {
      expenses += amount;
    }
  });

  const formatCurrency = (amount) => {
    const abs = Math.abs(amount);

    // Shorten for large numbers
    if (abs >= 1e12) return (amount / 1e12).toFixed(2) + "T€"; // For Trillions
    if (abs >= 1e9) return (amount / 1e9).toFixed(2) + "B€"; // For Billions
    if (abs >= 1e6) return (amount / 1e6).toFixed(2) + "M€"; // For Millions

    // Default formatting for smaller amounts
    return amount.toLocaleString("fi-FI", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const formattedIncome = formatCurrency(income);
  const formattedExpenses = formatCurrency(expenses);
  const formattedTotalBalance = formatCurrency(totalBalance);

  // Event handlers
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAddTransaction();
    }
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    const regex = /^(-?[\d]{0,7})(,\d{0,2})?$/;

    if (regex.test(newAmount)) {
      setAmount(newAmount);
    }
  };

  const handleAddTransaction = () => {
    let finalAmount = amount;
    let finalDescription = description;
    const numericAmount = parseFloat(finalAmount.replace(",", "."));

    // Remove trailing comma or space
    if (finalDescription.endsWith(",") || finalDescription.endsWith(" ")) {
      finalDescription = finalDescription.slice(0, -1);
    }

    // Ensure the description is not longer than 20 characters
    if (finalDescription.length > 20) {
      console.log("Description is too long! Max length is 20 characters.");
      return; // Exit early, don't proceed with adding the transaction
    }

    if (finalAmount.endsWith("-")) {
      console.log("Invalid transaction: Amount cannot end with '-'");
      return; // Exit the function without adding the transaction
    }

    if (finalAmount.startsWith("-,")) {
      console.log("Invalid transaction: Amount cannot start with '-,'");
      return; // Exit the function without adding the transaction
    }

    if (finalAmount.startsWith(",")) {
      console.log("Invalid transaction: Amount cannot start with ',");
      return; // Exit the function without adding the transaction
    }

    if (finalAmount.endsWith(",")) {
      finalAmount = finalAmount.slice(0, -1); // Remove the trailing comma
    }

    if (numericAmount === 0 || isNaN(numericAmount)) {
      console.log("Invalid transaction: Amount cannot be 0 or invalid");
      return;
    }

    // Remove unnecessary zero after the comma (e.g., "3000,0" should become "3000")
    if (finalAmount.includes(",") && finalAmount.split(",")[1] === "0") {
      finalAmount = finalAmount.split(",")[0]; // Remove everything after the comma if it's just "0"
    }

    // If there's a comma and only one digit after it, add a zero
    if (finalAmount.includes(",") && finalAmount.split(",")[1].length === 1) {
      finalAmount = finalAmount + "0"; // Add 0 after the decimal
    }

    if (finalDescription && amount) {
      const newTransaction = {
        id: uuidv4(),
        description: finalDescription,
        amount: finalAmount,
      };
      const updatedTransactions = [...transactions, newTransaction];

      setTransactions(updatedTransactions); // Update the state

      // Log the updated array (new transaction added)
      console.log("Updated transactions:", updatedTransactions);

      // Log just the last added transaction
      console.log(
        "Last added transaction:",
        updatedTransactions[updatedTransactions.length - 1]
      );

      // Reset the input fields
      setIsEmpty(false);
      setDescription("");
      setAmount("");
    }
  };

  const confirmReset = () => {
    setIsEmpty(true);
    setDescription("");
    setAmount("");
    setTransactions([]);
    setShowConfirm(false);
  };

  const cancelReset = () => {
    setShowConfirm(false);
  };

  const handleSaveData = () => {
    if (transactions.length === 0) {
      alert("No transactions to save.");
      return;
    }

    // Header
    let content =
      "============================ \n\t Transactions\n============================\n\n";

    // Transactions
    content += transactions
      .map((tx) => `${tx.description}: ${tx.amount} €`)
      .join("\n");

    content +=
      "\n\n============================ \n\t Summary\n============================\n";

    // Summary
    content += `\n\nTotal Income: ${formattedIncome}\n`;
    content += `Total Expenses: ${formattedExpenses}\n`;
    content += "============================ \n";
    content += `Total Balance: ${formattedTotalBalance}`;

    // Create a Blob and trigger download
    const blob = new Blob([content], { type: "text/plain;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    const timestamp = new Date().toISOString().split("T")[0];
    link.href = url;
    link.download = `transactions-${timestamp}.txt`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className={styles.main_container}>
      <img src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.balance_container}>
        <h2 className={styles.balance}>Your Balance 💰</h2>
        <p className={styles.balance_amount}>
          {totalBalance === 0 || totalBalance == null
            ? "0,00 €"
            : formattedTotalBalance}
        </p>
      </div>
      <div className={styles.income_expense_container}>
        <div className={styles.income_container}>
          <h3 className={styles.income_expense}>Income</h3>
          <p className={styles.income_amount}>{formattedIncome}</p>
        </div>
        <div className={styles.expense_container}>
          <h3 className={styles.income_expense}>Expenses</h3>
          <p className={styles.expense_amount}>{formattedExpenses}</p>
        </div>
      </div>
      <div className={styles.content_container}>
        <h2 className={styles.sub_section}>History 📜</h2>
      </div>
      <div className={styles.history_container}>
        {isEmpty ? (
          <p className={styles.empty_message}>No transactions yet</p>
        ) : (
          [...transactions].reverse().map((tx) => (
            <HistoryBar
              key={tx.id}
              description={tx.description}
              amount={tx.amount}
              onDelete={() => {
                const updatedTransactions = transactions.filter(
                  (item) => item.id !== tx.id
                );
                setTransactions(updatedTransactions);
                if (updatedTransactions.length === 0) {
                  setIsEmpty(true);
                }
              }}
            />
          ))
        )}
      </div>
      <div className={styles.content_container}>
        <h2 className={styles.sub_section}>Add Transaction ➕</h2>
      </div>
      <div className={styles.input_group}>
        <label htmlFor="description">
          Description of product or service<br></br>(20-character limit)
        </label>
        <input
          value={description}
          type="text"
          id="description"
          name="description"
          spellCheck="false"
          maxLength={20}
          onChange={handleDescriptionChange}
          placeholder="Example: Birthday gift"
          onKeyDown={handleKeyDown}
        />
      </div>
      <div className={styles.input_group}>
        <label htmlFor="amount">
          Amount<br></br>(up to 7 digits before the comma)
        </label>
        <input
          value={amount}
          type="text"
          id="amount"
          name="amount"
          onChange={handleAmountChange}
          placeholder="Example: -550,45€"
          onKeyDown={handleKeyDown}
        />
      </div>
      <BigButton onClick={handleAddTransaction}>💸 Add transaction</BigButton>
      <div className={styles.small_button_container}>
        <SmallButton onClick={() => setShowConfirm(true)}>
          🔁 Reset history
        </SmallButton>
        <SmallButton onClick={handleSaveData}>💾 Save as .txt</SmallButton>
        {showConfirm && (
          <div className={styles.modal_overlay}>
            <div className={styles.modal_content}>
              <p>Are you sure you want to reset all transaction history?</p>
              <div className={styles.modal_buttons}>
                <button onClick={confirmReset}>Yes, reset</button>
                <button onClick={cancelReset}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Expenses;
