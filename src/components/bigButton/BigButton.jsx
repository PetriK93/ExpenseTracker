import styles from "./BigButton.styles.module.css";

const BigButton = ({ children, onClick }) => {
  return (
    <button type={"button"} onClick={onClick} className={styles.big_button}>
      {children}
    </button>
  );
};

export default BigButton;
