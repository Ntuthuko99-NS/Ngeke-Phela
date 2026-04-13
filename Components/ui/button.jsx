// Simple Button Component (no external libraries)

export function Button({
  children,
  onClick,
  type = "button",
  variant = "default",
  size = "md",
  disabled = false
}) {

  // Decide style based on variant
  let style = "btn";

  if (variant === "destructive") style = "btn btn-danger";
  if (variant === "outline") style = "btn btn-outline";
  if (variant === "secondary") style = "btn btn-secondary";
  if (variant === "ghost") style = "btn btn-ghost";
  if (variant === "link") style = "btn btn-link";

  // Decide size
  if (size === "sm") style += " btn-sm";
  if (size === "lg") style += " btn-lg";
  if (size === "icon") style += " btn-icon";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={style}
    >
      {children}
    </button>
  );
}
