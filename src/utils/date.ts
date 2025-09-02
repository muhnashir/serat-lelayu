export function formatTanggalIndo(dateString: string): string {
  if (!dateString) return '-';
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

// Parse a YYYY-MM-DD or ISO string into year, month, day as numbers without timezone side effects
function parseYMD(dateString: string): { y: number; m: number; d: number } | null {
  if (!dateString) return null;
  // Prefer YYYY-MM-DD pattern
  const m = /^\s*(\d{4})-(\d{2})-(\d{2})/.exec(dateString);
  if (m) {
    const y = parseInt(m[1], 10);
    const mo = parseInt(m[2], 10);
    const d = parseInt(m[3], 10);
    return { y, m: mo, d };
  }
  // Fallback: use Date but then extract local components
  const dt = new Date(dateString);
  if (isNaN(dt.getTime())) return null;
  return { y: dt.getFullYear(), m: dt.getMonth() + 1, d: dt.getDate() };
}

// Julian Day Number for Gregorian calendar date (year=y, month=m, day=d)
function jdnFromGregorian(y: number, m: number, d: number): number {
  // Algorithm from Fliegel & Van Flandern
  const a = Math.floor((14 - m) / 12);
  const yy = y + 4800 - a;
  const mm = m + 12 * a - 3;
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - Math.floor(yy / 100) + Math.floor(yy / 400) - 32045;
}

const PASARAN_ORDER = ['Legi', 'Pahing', 'Pon', 'Wage', 'Kliwon'] as const;

export function getPasaran(dateString: string): string {
  const ymd = parseYMD(dateString);
  if (!ymd) return '-';
  const J = jdnFromGregorian(ymd.y, ymd.m, ymd.d);
  // Calibrated to local convention: 2025-09-02 → "Pahing"
  const idx = J % 5; // 0..4
  return PASARAN_ORDER[idx];
}

export function formatTanggalIndoDenganPasaran(dateString: string, dayName?: string): string {
  if (!dateString) return '-';
  const pasaran = getPasaran(dateString);
  const hari = dayName || new Date(dateString).toLocaleDateString('id-ID', { weekday: 'long' });
  return `${hari} ${pasaran}, ${formatTanggalIndo(dateString)}`;
}
