export const CAMP = {
  title: "MINT-Ferienwoche",
  edition: "Aurora 2026",
  tagline: "Entdecken. Forschen. Staunen.",
  dates: "20. – 24. Juli 2026",
  place: "Forschungszentrum Aurora",
  city: "Karlsruhe",
  ages: "12 – 16 Jahre",
  hours: "09:00 – 16:30 Uhr",
} as const;

export const WEEKDAYS = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
] as const;

export const EMOJI_SCALE = [
  { value: "😫", label: "Anstrengend", hint: "Heute war richtig hart." },
  { value: "😕", label: "Durchwachsen", hint: "Nicht alles hat geklappt." },
  { value: "😐", label: "Okay", hint: "Solider Camp-Tag." },
  { value: "🙂", label: "Schön", hint: "Hat richtig Spaß gemacht." },
  { value: "🤩", label: "Unvergesslich", hint: "Absolutes Highlight!" },
] as const;

export const CAMP_FACTS = [
  {
    kicker: "Für wen",
    title: "Neugierige Köpfe",
    body: "Zwölf- bis Sechzehnjährige, die Roboter, Moleküle, Code und Naturphänomene lieber selbst ausprobieren als nur darüber zu lesen.",
  },
  {
    kicker: "Was passiert",
    title: "Fünf Labortage",
    body: "Jede Station verbindet Theorie mit einem greifbaren Experiment – von der ersten Schaltung bis zur Abschlusspräsentation am Freitag.",
  },
  {
    kicker: "Wo",
    title: "Campus Aurora",
    body: "Werkstätten, Chemielabor, Darkroom für Photonik und ein kleines Außengelände für Feldforschung – alles zu Fuß erreichbar.",
  },
  {
    kicker: "Betreuung",
    title: "Mentor:innen aus der Praxis",
    body: "Studierende, Forschende und Maker:innen begleiten in kleinen Gruppen. Fragen sind erwünscht, Fehler sind Teil des Protokolls.",
  },
] as const;
