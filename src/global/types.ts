export interface Project {
  title: { [key: string]: string };
  description: { [key: string]: string };
  htmlDescription: { [key: string]: string };
  thumbnail: string;
  images: string[];
  external_link: { type: string; url: string };
  technologies: string[];
}
