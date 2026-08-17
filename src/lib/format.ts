const dateFormatter = new Intl.DateTimeFormat("de-DE", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const shortDateFormatter = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});

export function parseIsoDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, (month ?? 1) - 1, day ?? 1);
}

export function formatLongDate(value: string) {
  return dateFormatter.format(parseIsoDate(value));
}

export function formatShortDate(value: string) {
  return shortDateFormatter.format(parseIsoDate(value));
}

export function weekdayFromIso(value: string) {
  return new Intl.DateTimeFormat("de-DE", { weekday: "long" }).format(
    parseIsoDate(value),
  );
}

export function normalizeList(values: string[] | null | undefined) {
  return (values ?? [])
    .map((value) => value.trim())
    .filter((value) => value.length > 0);
}
