import { readFile } from "node:fs/promises";
import path from "node:path";
import YAML from "yaml";

export type SiteData = {
  name: string;
  shortName?: string;
  fullName?: { zh?: string; en?: string };
  url?: string;
  contactEmail?: string;
  githubUrl?: string;
  meta?: {
    title?: { zh?: string; en?: string };
    tagline?: { zh?: string; en?: string };
    description?: { zh?: string; en?: string };
  };
};

export type Person = {
  id: string;
  role: "mentor" | "member" | "alumni" | string;
  name?: { zh?: string; en?: string };
  title?: { zh?: string; en?: string };
  domain?: ("EDA" | "LCA" | string)[] | "EDA" | "LCA" | string;
  join_year?: number;
  photo?: string;
  bio?: { zh?: string; en?: string };
  is_outstanding?: boolean;
  outstanding_order?: number;
  destination?: { zh?: string; en?: string };
  pub_ids?: string[];
};

export type PeopleData = { people: Person[] };

export type Publication = {
  id: string;
  title: string;
  authors?: string[];
  venue?: string;
  year?: number;
  area?: "EDA" | "LCA" | string;
  link?: string;
  type?: string;
  note?: string;
};

export type PublicationsData = { publications: Publication[] };

export type Project = {
  id: string;
  area?: "EDA" | "LCA" | string;
  status?: "ongoing" | "completed" | string;
  github?: string;
  lead?: { zh?: string; en?: string };
  title?: { zh?: string; en?: string };
  summary?: { zh?: string; en?: string };
  start_year?: number;
};

export type ProjectsData = { projects: Project[] };

async function readYamlFile<T>(relPath: string): Promise<T> {
  const abs = path.resolve(process.cwd(), relPath);
  const content = await readFile(abs, "utf-8");
  return YAML.parse(content) as T;
}

export async function getSite(): Promise<SiteData> {
  return readYamlFile<SiteData>("data/site.yaml");
}

export async function getPeople(): Promise<Person[]> {
  const d = await readYamlFile<PeopleData>("data/people.yaml");
  return d.people ?? [];
}

export async function getPublications(): Promise<Publication[]> {
  const d = await readYamlFile<PublicationsData>("data/publications.yaml");
  return d.publications ?? [];
}

export async function getProjects(): Promise<Project[]> {
  const d = await readYamlFile<ProjectsData>("data/projects.yaml");
  return d.projects ?? [];
}

export function indexById<T extends { id: string }>(items: T[]): Map<string, T> {
  const m = new Map<string, T>();
  for (const it of items) m.set(it.id, it);
  return m;
}
