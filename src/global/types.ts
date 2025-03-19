import { supportedLanguages, experiencesTypes } from "./constants";

export type SupportedLanguage = (typeof supportedLanguages)[number];

export interface Technology {
  name: string;
  icon: string;
}

export interface SkillGroup {
  category: string | { [key in SupportedLanguage]: string };
  technologies: Technology[];
}

export interface Project {
  title: { [key in SupportedLanguage]: string };
  unix_timestamp: { from: number; to?: number };
  description: { [key in SupportedLanguage]: string };
  html_description: { [key in SupportedLanguage]: string };
  thumbnail: string;
  images: string[];
  external_link: { type: string; url: string };
  video: { exists: boolean; url: string };
  tags: { [key in SupportedLanguage]: string[] };
  technologies: string[];
}

export type ExperienceType = (typeof experiencesTypes)[number];

export interface Experience {
  company: string;
  role?: string;
  type: ExperienceType;
  unix_timestamp: { from: number; to?: number };
  description: { [key in SupportedLanguage]: string };
}

// ? Forms

export interface ContactData {
  name: string;
  email: string;
  message: string;
}