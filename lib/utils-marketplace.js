export function formatZAR(cents) {
  if (!cents && cents !== 0) return 'R 0';
  const rands = cents / 100;
  return 'R ' + rands.toLocaleString('en-ZA', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

export function timeAgo(dateString) {
  if (!dateString) return '';
  const now = new Date();
  const date = new Date(dateString);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);
  
  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  return date.toLocaleDateString('en-ZA', { day: 'numeric', month: 'short' });
}

export const CATEGORIES = [
  { name: 'Electronics', icon: '💻' },
  { name: 'Vehicles', icon: '🚗' },
  { name: 'Furniture', icon: '🪑' },
  { name: 'Clothing', icon: '👕' },
  { name: 'Braai & Outdoor', icon: '🔥' },
  { name: 'Property', icon: '🏠' },
  { name: 'Jobs', icon: '💼' },
  { name: 'Services', icon: '🔧' },
  { name: 'Spaza Supplies', icon: '🏪' },
  { name: 'Baby & Kids', icon: '👶' },
  { name: 'Sports & Leisure', icon: '⚽' },
  { name: 'Home & Garden', icon: '🌿' },
  { name: 'Books & Education', icon: '📚' },
  { name: 'Pets', icon: '🐕' },
  { name: 'Other', icon: '📦' },
];

export const PROVINCES = [
  'Gauteng', 'Western Cape', 'KwaZulu-Natal', 'Eastern Cape',
  'Free State', 'Limpopo', 'Mpumalanga', 'North West', 'Northern Cape'
];

export const CONDITIONS = ['New', 'Like New', 'Good', 'Fair', 'Poor'];
