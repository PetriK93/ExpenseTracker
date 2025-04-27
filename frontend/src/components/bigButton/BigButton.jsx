import styles from "./BigButton.styles.module.css";

const BigButton = ({ children, onClick, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.big_button} ${className}`}
    >
      {children}
    </button>
  );
};

export default BigButton;
