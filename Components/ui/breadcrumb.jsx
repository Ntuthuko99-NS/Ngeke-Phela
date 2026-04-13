// Simple Breadcrumb System (no external libraries)


// Main wrapper (navigation container)
export function Breadcrumb({ children }) {
  return (
    <nav aria-label="breadcrumb">
      {children}
    </nav>
  );
}


// List of breadcrumb items
export function BreadcrumbList({ children }) {
  return (
    <ol className="breadcrumb-list">
      {children}
    </ol>
  );
}


// Single breadcrumb item
export function BreadcrumbItem({ children }) {
  return (
    <li className="breadcrumb-item">
      {children}
    </li>
  );
}


// Clickable breadcrumb link
export function BreadcrumbLink({ href, children }) {
  return (
    <a href={href} className="breadcrumb-link">
      {children}
    </a>
  );
}


// Current page (not clickable)
export function BreadcrumbPage({ children }) {
  return (
    <span className="breadcrumb-current">
      {children}
    </span>
  );
}


// Separator between items (>)
export function BreadcrumbSeparator() {
  return (
    <span className="breadcrumb-separator">
      &gt;
    </span>
  );
}


// Ellipsis (for hidden items like "...")
export function BreadcrumbEllipsis() {
  return (
    <span className="breadcrumb-ellipsis">
      ...
    </span>
  );
}
