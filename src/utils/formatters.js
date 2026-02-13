export const formatCompactNumber = (value) => {
  if (value === undefined || value === null || Number.isNaN(Number(value))) {
    return 'N/A';
  }

  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(Number(value));
};

export const formatRelativeDate = (dateValue) => {
  if (!dateValue) return 'Unknown date';

  const now = new Date();
  const date = new Date(dateValue);
  const seconds = Math.floor((now - date) / 1000);

  if (Number.isNaN(seconds)) return 'Unknown date';

  const intervals = [
    ['year', 31536000],
    ['month', 2592000],
    ['week', 604800],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
  ];

  for (const [label, divisor] of intervals) {
    const count = Math.floor(seconds / divisor);
    if (count >= 1) {
      return `${count} ${label}${count > 1 ? 's' : ''} ago`;
    }
  }

  return 'Just now';
};
