// Simple Accordion Components


// Main accordion container
export function Accordion({ children }) {
  return <div>{children}</div>;
}


// Each accordion item (one section)
export function AccordionItem({ children }) {
  return <div className="border-bottom">{children}</div>;
}


// Clickable title (opens/closes content)
export function AccordionTrigger({ title, isOpen, onClick }) {
  return (
    <div className="accordion-header" onClick={onClick}>
      <span>{title}</span>
      <span>{isOpen ? "▲" : "▼"}</span>
    </div>
  );
}


// Content that shows/hides
export function AccordionContent({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="accordion-content">
      {children}
    </div>
  );
}
