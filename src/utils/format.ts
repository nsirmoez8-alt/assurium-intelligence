const currencyFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

const currencyFormatterDecimal = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 2,
});

const numberFormatter = new Intl.NumberFormat("fr-FR");

const dateFormatter = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const dateFormatterLong = new Intl.DateTimeFormat("fr-FR", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateFormatterShort = new Intl.DateTimeFormat("fr-FR", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

export function formatCurrency(value: number, decimals = false): string {
  return decimals ? currencyFormatterDecimal.format(value) : currencyFormatter.format(value);
}

export function formatNumber(value: number): string {
  return numberFormatter.format(value);
}

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso));
}

export function formatDateLong(iso: string): string {
  return dateFormatterLong.format(new Date(iso));
}

export function formatDateShort(iso: string): string {
  return dateFormatterShort.format(new Date(iso));
}

export function daysUntil(iso: string): number {
  const target = new Date(iso).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);
  return Math.round((target - today) / (1000 * 60 * 60 * 24));
}

export function formatRelativeDays(iso: string): string {
  const days = daysUntil(iso);
  if (days === 0) return "Aujourd'hui";
  if (days === 1) return "Demain";
  if (days === -1) return "Hier";
  if (days > 1) return `Dans ${days} jours`;
  return `Il y a ${Math.abs(days)} jours`;
}

export function initials(firstName: string, lastName: string): string {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
}
