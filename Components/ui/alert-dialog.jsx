// Simple Alert Dialog (no libraries, just basic React)


// Main dialog component
export function AlertDialog({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="dialog-overlay">
      <div className="dialog-box">
        {children}
      </div>
    </div>
  );
}


// Button that opens the dialog
export function AlertDialogTrigger({ onClick, children }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}


// Dialog content container
export function AlertDialogContent({ children }) {
  return (
    <div>
      {children}
    </div>
  );
}


// Header (title section)
export function AlertDialogHeader({ children }) {
  return (
    <div className="dialog-header">
      {children}
    </div>
  );
}


// Footer (buttons section)
export function AlertDialogFooter({ children }) {
  return (
    <div className="dialog-footer">
      {children}
    </div>
  );
}


// Title text
export function AlertDialogTitle({ children }) {
  return (
    <h2 className="dialog-title">
      {children}
    </h2>
  );
}


// Description text
export function AlertDialogDescription({ children }) {
  return (
    <p className="dialog-description">
      {children}
    </p>
  );
}


// Confirm / action button
export function AlertDialogAction({ onClick, children }) {
  return (
    <button className="btn-primary" onClick={onClick}>
      {children}
    </button>
  );
}


// Cancel button
export function AlertDialogCancel({ onClick, children }) {
  return (
    <button className="btn-outline" onClick={onClick}>
      {children}
    </button>
  );
}
