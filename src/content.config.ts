import { defineCollection, z } from "astro:content";

const home = defineCollection({
  type: "content",
  schema: z.object({
    hero_title: z.string(),
    hero_lead: z.string(),
    hero_cta_primary: z.string(),
    hero_cta_secondary: z.string(),

    overview_eyebrow: z.string(),
    overview_title: z.string(),
    overview_description: z.string(),

    mission_title: z.string(),
    mission_body: z.string(),

    beliefs_title: z.string(),
    beliefs_items: z.array(z.string()),

    research_eyebrow: z.string(),
    research_title: z.string(),
    research_description: z.string(),

    track_eda_title: z.string(),
    track_eda_description: z.string(),
    track_eda_items: z.array(z.string()),

    track_lca_title: z.string(),
    track_lca_description: z.string(),
    track_lca_items: z.array(z.string()),

    publications_eyebrow: z.string(),
    publications_title: z.string(),
    publications_description: z.string(),
    publications_card_text: z.string(),
    publications_card_button: z.string(),

    join_cta_title: z.string(),
    join_cta_body: z.string(),
    join_cta_button: z.string(),
  }),
});

const join = defineCollection({
  type: "content",
  schema: z.object({
    eyebrow: z.string().optional(),
    title: z.string(),
    description: z.string().optional(),
    email_subject_template: z.string().optional(),
    email_button_label: z.string().optional(),
  }),
});

const news = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    summary: z.string().optional(),
  }),
});

const alumni = defineCollection({
  type: "content",
  schema: z.object({
    id: z.string(),
    name: z.string(),
    destination: z.string().optional(),
    publications: z
      .array(
        z.object({
          title: z.string(),
          venue: z.string().optional(),
          year: z.number().int().optional(),
          link: z.string().optional(),
        }),
      )
      .optional(),
  }),
});

export const collections = { home, join, news, alumni };

