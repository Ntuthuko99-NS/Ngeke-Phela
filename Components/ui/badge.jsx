// Simple Badge Component (no external libraries)

export function Badge({ type = "default", children }) {

  // Decide style based on type
  let style = "badge";

  if (type === "secondary") style = "badge badge-secondary";
  if (type === "error") style = "badge badge-error";
  if (type === "outline") style = "badge badge-outline";

  return (
    <span className={style}>
      {children}
    </span>
  );
}
