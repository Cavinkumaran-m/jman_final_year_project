import styles from "./Button.module.css";

export default function Button({
  children,
  className,
  onClick,
}: {
  children: string | React.ReactNode;
  className?: string | undefined;
  onClick?: () => void;
}) {
  return (
    <div onClick={onClick} className={`${styles.button} ${className}`}>
      {children}
    </div>
  );
}
