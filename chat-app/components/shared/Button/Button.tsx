import styles from "./Button.module.scss";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
};

const Button = ({
  onClick,
  disabled,
  children,
  type = "button",
}: ButtonProps) => {
  return (
    <button
      className={styles.customButton}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
