export interface Project {
  title: { [key: string]: string };
  unix_timestamp: { from: number; to: number | undefined };
  description: { [key: string]: string };
  html_description: { [key: string]: string };
  thumbnail: string;
  images: string[];
  external_link: { type: string; url: string };
  video: { exists: boolean; url: string };
  tags: { [key: string]: string };
  technologies: string[];
}

// * Only testing.. correct later
export interface Experience {
  company: string;
  role: string;
  type: string;
  from: string;
  to: string;
  description: string;
}
