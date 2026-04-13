// Simple Alert Component


// Main alert box
export function Alert({ type = "default", children }) {

  // Choose style based on type
  const style =
    type === "error"
      ? "alert alert-error"
      : "alert alert-normal";

  return (
    <div className={style}>
      {children}
    </div>
  );
}


// Alert title (heading)
export function AlertTitle({ children }) {
  return (
    <h4 className="alert-title">
      {children}
    </h4>
  );
}


// Alert description (text)
export function AlertDescription({ children }) {
  return (
    <p className="alert-description">
      {children}
    </p>
  );
}
