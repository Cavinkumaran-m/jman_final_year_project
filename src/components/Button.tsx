import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: string | React.ReactNode;
}

export default function Button({
  children,
  className,
  ...props // Spread other attributes
}: ButtonProps) {
  return (
    <button {...props} className={`${styles.button} btn btn-sm ${className}`}>
      {children}
    </button>
  );
}
