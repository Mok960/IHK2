CREATE TABLE "diary_entries" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"location" text NOT NULL,
	"date" date NOT NULL,
	"day" text NOT NULL,
	"description" text NOT NULL,
	"image_url" text,
	"link_url" text,
	"link_label" text,
	"emoji" text NOT NULL,
	"items_brought" text[] DEFAULT '{}'::text[] NOT NULL,
	"highlights" text[] DEFAULT '{}'::text[] NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "homepage" (
	"id" serial PRIMARY KEY,
	"title" text NOT NULL,
	"edition" text NOT NULL,
	"tagline" text NOT NULL,
	"intro" text NOT NULL,
	"dates" text NOT NULL,
	"place" text NOT NULL,
	"city" text NOT NULL,
	"ages" text NOT NULL,
	"hours" text NOT NULL,
	"about_title" text NOT NULL,
	"about_body" text NOT NULL,
	"schedule_note" text NOT NULL,
	"start_date" text NOT NULL,
	"end_date" text NOT NULL,
	"cta_kicker" text NOT NULL,
	"cta_title" text NOT NULL,
	"cta_body" text NOT NULL,
	"cta_label" text NOT NULL,
	"hero_image_url" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "homepage_facts" (
	"id" serial PRIMARY KEY,
	"kicker" text NOT NULL,
	"title" text NOT NULL,
	"body" text NOT NULL,
	"sort_order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sponsors" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"info" text NOT NULL,
	"logo_url" text NOT NULL,
	"website" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
