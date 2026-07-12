// Le dinar tunisien (TND) se subdivise en 1000 millimes ; le support ICU de "TND"
// étant inégal selon les environnements, on formate le montant nous-mêmes et on
// ajoute le suffixe "DT" (Dinar Tunisien), l'usage courant en Tunisie.
const amountFormatter = new Intl.NumberFormat("fr-TN", {
  maximumFractionDigits: 0,
});

const amountFormatterDecimal = new Intl.NumberFormat("fr-TN", {
  minimumFractionDigits: 3,
  maximumFractionDigits: 3,
});

const numberFormatter = new Intl.NumberFormat("fr-TN");

const dateFormatter = new Intl.DateTimeFormat("fr-TN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const dateFormatterLong = new Intl.DateTimeFormat("fr-TN", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

const dateFormatterShort = new Intl.DateTimeFormat("fr-TN", {
  day: "2-digit",
  month: "2-digit",
  year: "2-digit",
});

export function formatCurrency(value: number, decimals = false): string {
  return decimals ? `${amountFormatterDecimal.format(value)} DT` : `${amountFormatter.format(value)} DT`;
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
