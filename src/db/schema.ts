import { sql } from "drizzle-orm";
import {
  date,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const sponsors = pgTable("sponsors", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  info: text("info").notNull(),
  logoUrl: text("logo_url").notNull(),
  website: text("website"),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const diaryEntries = pgTable("diary_entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  location: text("location").notNull(),
  date: date("date").notNull(),
  day: text("day").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url"),
  linkUrl: text("link_url"),
  linkLabel: text("link_label"),
  emoji: text("emoji").notNull(),
  itemsBrought: text("items_brought")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  highlights: text("highlights")
    .array()
    .notNull()
    .default(sql`'{}'::text[]`),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const homepage = pgTable("homepage", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  edition: text("edition").notNull(),
  tagline: text("tagline").notNull(),
  intro: text("intro").notNull(),
  dates: text("dates").notNull(),
  place: text("place").notNull(),
  city: text("city").notNull(),
  ages: text("ages").notNull(),
  hours: text("hours").notNull(),
  aboutTitle: text("about_title").notNull(),
  aboutBody: text("about_body").notNull(),
  scheduleNote: text("schedule_note").notNull(),
  startDate: text("start_date").notNull(),
  endDate: text("end_date").notNull(),
  ctaKicker: text("cta_kicker").notNull(),
  ctaTitle: text("cta_title").notNull(),
  ctaBody: text("cta_body").notNull(),
  ctaLabel: text("cta_label").notNull(),
  heroImageUrl: text("hero_image_url"),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const homepageFacts = pgTable("homepage_facts", {
  id: serial("id").primaryKey(),
  kicker: text("kicker").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export type Sponsor = typeof sponsors.$inferSelect;
export type NewSponsor = typeof sponsors.$inferInsert;
export type DiaryEntry = typeof diaryEntries.$inferSelect;
export type NewDiaryEntry = typeof diaryEntries.$inferInsert;
export type Homepage = typeof homepage.$inferSelect;
export type HomepageFact = typeof homepageFacts.$inferSelect;
