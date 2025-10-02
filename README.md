# Expense Tracker

[![Preview 1](https://github.com/user-attachments/assets/0626bdaf-2eef-43be-ac64-4e8c03d6e798)](https://github.com/user-attachments/assets/0626bdaf-2eef-43be-ac64-4e8c03d6e798)

[![Preview 2](https://github.com/user-attachments/assets/d9a11a1d-d9db-4ba6-82e5-aca5fad40a5a)](https://github.com/user-attachments/assets/d9a11a1d-d9db-4ba6-82e5-aca5fad40a5a)

A simple and lightweight **Expense Tracker** built with **React** and **Vite**. Track your income, expenses, and total balance, and save your transaction history as a `.txt` file.

---

## Features

- **Add transactions** with description and amount.
- **Track balance**: See your total balance, income, and expenses.
- **History view**: View past transactions with an option to delete them individually.
- **Reset history**: Clear all transactions with confirmation.
- **Save history**: Export your transactions as a `.txt` file.
- **Input validation**: Prevent invalid entries and enforce limits (description max 20 characters, up to 7 digits before the comma).
- **Responsive UI**: Clean, modern interface.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/PetriK93/ExpenseTracker.git


2. Navigate to the project directory:

cd ExpenseTracker

3. Install dependencies:

npm install

4. Start the development server:

npm run dev
```

## Usage

Enter a description (max 20 characters) and an amount (use comma for decimals, negative for expenses).

Press Enter or click Add transaction to add it to the history.

View your total balance, income, and expenses at the top.

Reset history using Reset history button (with confirmation).

Save all transactions as a .txt file using Save as .txt button.

## Tech Stack

React (Functional components + hooks)

Vite (Fast development server + build tool)

CSS Modules for styling

UUID for unique transaction IDs

## License

This project is licensed under the MIT License.
