import { CAMP, CAMP_FACTS } from "@/lib/constants";
import { count } from "drizzle-orm";
import { db } from "./index";
import { diaryEntries, homepage, homepageFacts, sponsors } from "./schema";

const defaultSponsors = [
  {
    name: "TechWerk Stiftung",
    info: "Stellt Werkstatt, 3D-Drucker und die Robotik-Kits für die ganze Woche.",
    logoUrl: "/images/sponsors/techwerk.png",
    website: "https://example.com/techwerk",
    sortOrder: 1,
  },
  {
    name: "Hochschule Nova",
    info: "Mentor:innen aus Informatik und Physik begleiten die Laborstationen.",
    logoUrl: "/images/sponsors/nova.png",
    website: "https://example.com/hochschule-nova",
    sortOrder: 2,
  },
  {
    name: "FutureLab e.V.",
    info: "Ermöglicht Stipendienplätze und die Nachmittags-Experimente.",
    logoUrl: "/images/sponsors/futurelab.png",
    website: "https://example.com/futurelab",
    sortOrder: 3,
  },
  {
    name: "Photonik AG",
    info: "Schenkt Sensorik, Mikrocontroller und das Lichtlabor am Mittwoch.",
    logoUrl: "/images/sponsors/photonik.png",
    website: "https://example.com/photonik",
    sortOrder: 4,
  },
];

const defaultEntries = [
  {
    title: "Der Roboter wacht auf",
    location: "Makerhalle, Campus Aurora",
    date: "2026-07-20",
    day: "Montag",
    description:
      "Erster Camp-Tag, erstes Team, erstes Kabelchaos. Wir haben Chassis, Motoren und einen winzigen Bordcomputer zusammengebaut und gelernt, warum ein Roboter ohne saubere Masseleitung einfach nur ein teurer Briefbeschwerer ist. Am Nachmittag fuhr unser Prototyp zum ersten Mal eine Acht – schief, laut und trotzdem magisch.",
    imageUrl: "/images/entries/robotik.jpg",
    linkUrl: "https://de.wikipedia.org/wiki/Mobile_Robotik",
    linkLabel: "Hintergrund: Mobile Robotik",
    emoji: "🤩",
    itemsBrought: ["Schraubendreher-Set", "Skizzenbuch", "Wasserflasche"],
    highlights: [
      "Erste erfolgreiche Testfahrt in der Acht",
      "Teamname gefunden: Polaris",
      "Abendliche Siegerehrung für das leiseste Getriebe",
    ],
  },
  {
    title: "Farbe, die leuchtet",
    location: "Chemielabor B2",
    date: "2026-07-21",
    day: "Dienstag",
    description:
      "Schutzbrille auf, Pipette in der Hand, Herz etwas schneller. Wir haben Indikatoren gemischt, pH-Werte sichtbar gemacht und am Ende eine chemische Gartenlandschaft in einem Becherglas wachsen lassen. Am spannendsten war der Moment, in dem uns klar wurde: Jede Farbe ist nur eine Geschichte über Elektronen.",
    imageUrl: "/images/entries/chemie.jpg",
    linkUrl: "https://de.wikipedia.org/wiki/Indikator_(Chemie)",
    linkLabel: "Was ist ein Indikator?",
    emoji: "🙂",
    itemsBrought: ["Laborkittel", "Notizheft", "Geschlossene Schuhe"],
    highlights: [
      "Eigener Indikator aus Rotkohl",
      "Kristallgarten im Zeitraffer",
      "Sicherheitsbriefing ohne Langeweile",
    ],
  },
  {
    title: "Daten, die Geschichten erzählen",
    location: "Code-Atelier & Darkroom",
    date: "2026-07-22",
    day: "Mittwoch",
    description:
      "Vormittags haben wir Sensordaten unserer Roboter visualisiert, nachmittags Lichtbrechung gemessen und in wenigen Zeilen Python in Kurven verwandelt. Der Darkroom fühlte sich an wie ein kleines Planetarium: ein Strahl, ein Prisma, und plötzlich lag das gesamte Farbspektrum auf dem Tisch.",
    imageUrl: "/images/entries/coding.jpg",
    linkUrl: "https://de.wikipedia.org/wiki/Datenvisualisierung",
    linkLabel: "Mehr zu Datenvisualisierung",
    emoji: "🙂",
    itemsBrought: ["Laptop", "Kopfhörer", "USB-Stick"],
    highlights: [
      "Live-Plot der Motortemperatur",
      "Prisma-Experiment im Darkroom",
      "Mini-Dashboard für unser Team",
    ],
  },
  {
    title: "Draußen ist auch ein Labor",
    location: "Außengelände & Waldrand",
    date: "2026-07-23",
    day: "Donnerstag",
    description:
      "Feldtag. Wir haben Bodenfeuchte, Temperatur und Lichtintensität entlang eines Transektes gemessen und verglichen, wie sich der Waldsaum vom offenen Campus unterscheidet. Zwischen Moos und Messgerät wurde klar, dass Wissenschaft nicht nur unter Neonröhren stattfindet.",
    imageUrl: "/images/entries/outdoor.jpg",
    linkUrl: "https://de.wikipedia.org/wiki/Umweltmonitoring",
    linkLabel: "Umweltmonitoring erklärt",
    emoji: "😐",
    itemsBrought: ["Wettertäschchen", "Feldprotokoll", "Mückenspray"],
    highlights: [
      "Eigene Messreihe am Waldrand",
      "Vergleich Campus vs. Schattenhang",
      "Picknick mit Datenauswertung",
    ],
  },
  {
    title: "Polaris auf der Bühne",
    location: "Audimax Aurora",
    date: "2026-07-24",
    day: "Freitag",
    description:
      "Letzter Tag, letzte Schraube, erste richtige Präsentation. Wir haben unseren Roboter, die Chemiedaten und das Waldprofil zu einer kleinen Forschungsstory verbunden. Nicht alles lief glatt – die Demo hakte einmal – aber der Applaus danach gehörte uns. Die Woche endet, die Neugier bleibt.",
    imageUrl: "/images/entries/finale.jpg",
    linkUrl: "https://de.wikipedia.org/wiki/Wissenschaftskommunikation",
    linkLabel: "Wissenschaft zeigen",
    emoji: "🤩",
    itemsBrought: ["Präsentationskarten", "Prototype", "Mut"],
    highlights: [
      "Fünf-Minuten-Pitch vor Mentor:innen",
      "Live-Demo trotz kleinem Bug",
      "Zertifikat und Gruppenfoto im Foyer",
    ],
  },
];

const defaultHomepage = {
  title: CAMP.title,
  edition: CAMP.edition,
  tagline: CAMP.tagline,
  intro:
    "Ein Wochenprotokoll aus Werkstatt, Labor und Wald – bunt, neugierig und ein bisschen magisch.",
  dates: CAMP.dates,
  place: CAMP.place,
  city: CAMP.city,
  ages: CAMP.ages,
  hours: CAMP.hours,
  aboutTitle: "Fünf Tage, ein Labor für Neugier",
  aboutBody:
    "Die MINT-Ferienwoche Aurora ist kein Frontalunterricht und kein Beschäftigungspaket. Sie ist ein verdichtetes Forschungsstudio: morgens bauen, mittags messen, nachmittags begreifen, warum etwas funktioniert – oder spektakulär nicht.",
  scheduleNote:
    "Kleine Teams, echte Werkzeuge, ein gemeinsames Abschlussprojekt. Jeder Tag hinterlässt einen Eintrag im Tagebuch – mit Ort, Stimmung, Gepäckliste und den Momenten, die bleiben.",
  startDate: "2026-07-20",
  endDate: "2026-07-24",
  ctaKicker: "Das Protokoll",
  ctaTitle: "Die Woche lebt im Tagebuch",
  ctaBody:
    "Jeder Eintrag hält fest, wo wir waren, was wir mitgenommen haben und welcher Moment den Tag geprägt hat.",
  ctaLabel: "Zum Tagebuch",
  heroImageUrl: "/images/hero.jpg",
};

const defaultFacts = CAMP_FACTS.map((fact, index) => ({
  kicker: fact.kicker,
  title: fact.title,
  body: fact.body,
  sortOrder: index + 1,
}));

export async function seedIfEmpty() {
  const [{ value: sponsorCount }] = await db
    .select({ value: count() })
    .from(sponsors);
  const [{ value: entryCount }] = await db
    .select({ value: count() })
    .from(diaryEntries);
  const [{ value: homeCount }] = await db
    .select({ value: count() })
    .from(homepage);

  if (sponsorCount === 0) {
    await db.insert(sponsors).values(defaultSponsors);
  }

  if (entryCount === 0) {
    await db.insert(diaryEntries).values(defaultEntries);
  }

  if (homeCount === 0) {
    await db.insert(homepage).values(defaultHomepage);
    await db.insert(homepageFacts).values(defaultFacts);
  }
}
