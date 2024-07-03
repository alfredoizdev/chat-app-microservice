import styles from "./Button.module.scss";

type ButtonProps = {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
};

const Button = ({
  onClick,
  disabled,
  children,
  type = "button",
  loading = false,
}: ButtonProps) => {
  return (
    <button
      className={`
      ${styles.customButton} 
      ${loading ? styles.loading : ""}
      `}
      onClick={onClick}
      disabled={disabled}
      type={type}
    >
      {children}
    </button>
  );
};

export default Button;
