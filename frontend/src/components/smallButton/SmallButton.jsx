import styles from "./SmallButton.styles.module.css";

const SmallButton = ({ children, onClick }) => {
  return (
    <button type={"button"} onClick={onClick} className={styles.small_button}>
      {children}
    </button>
  );
};

export default SmallButton;
