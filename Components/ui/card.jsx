// Simple Card Components (no external libraries)


// Main card container
export function Card({ children }) {
  return (
    <div className="card">
      {children}
    </div>
  );
}


// Card header (top section)
export function CardHeader({ children }) {
  return (
    <div className="card-header">
      {children}
    </div>
  );
}


// Card title (main heading)
export function CardTitle({ children }) {
  return (
    <h3 className="card-title">
      {children}
    </h3>
  );
}


// Card description (subtitle / small text)
export function CardDescription({ children }) {
  return (
    <p className="card-description">
      {children}
    </p>
  );
}


// Card main content area
export function CardContent({ children }) {
  return (
    <div className="card-content">
      {children}
    </div>
  );
}


// Card footer (bottom actions area)
export function CardFooter({ children }) {
  return (
    <div className="card-footer">
      {children}
    </div>
  );
}
