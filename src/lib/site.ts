import { db } from "@/db";
import { homepage, homepageFacts } from "@/db/schema";
import { seedIfEmpty } from "@/db/seed";
import { CAMP, CAMP_FACTS } from "@/lib/constants";
import { asc } from "drizzle-orm";

export async function getSiteContent() {
  await seedIfEmpty();

  const [page] = await db.select().from(homepage).limit(1);
  const facts = await db
    .select()
    .from(homepageFacts)
    .orderBy(asc(homepageFacts.sortOrder), asc(homepageFacts.id));

  return {
    page: page ?? {
      id: 0,
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
        "Die MINT-Ferienwoche Aurora ist kein Frontalunterricht und kein Beschäftigungspaket.",
      scheduleNote: `Täglich ${CAMP.hours}.`,
      startDate: "2026-07-20",
      endDate: "2026-07-24",
      ctaKicker: "Das Protokoll",
      ctaTitle: "Die Woche lebt im Tagebuch",
      ctaBody: "Jeder Eintrag hält fest, wo wir waren.",
      ctaLabel: "Zum Tagebuch",
      heroImageUrl: "/images/hero.jpg",
      updatedAt: new Date(),
    },
    facts:
      facts.length > 0
        ? facts
        : CAMP_FACTS.map((fact, index) => ({
            id: index + 1,
            kicker: fact.kicker,
            title: fact.title,
            body: fact.body,
            sortOrder: index + 1,
          })),
  };
}
