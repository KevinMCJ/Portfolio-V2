import { ReactNode } from "react";
import {
  FaHome,
  FaUser,
  FaLightbulb,
  FaLaptopCode,
  FaEnvelope,
  FaBriefcase,
} from "react-icons/fa";

export type NavItem = {
  icon: ReactNode;
  i18n_key: string;
  path: string;
  hash?: string;
};

export const navItemsByPath: Record<string, NavItem[]> = {
  "/": [
    {
      icon: <FaLightbulb />,
      i18n_key: "content.nav_skills",
      path: "/",
      hash: "#skills",
    },
    {
      icon: <FaLaptopCode />,
      i18n_key: "content.nav_projects",
      path: "/",
      hash: "#projects",
    },
    {
      icon: <FaBriefcase />,
      i18n_key: "content.nav_experience",
      path: "/",
      hash: "#experience",
    },
    {
      icon: <FaUser />,
      i18n_key: "content.nav_about",
      path: "/",
      hash: "#about",
    },
    {
      icon: <FaEnvelope />,
      i18n_key: "content.nav_contact",
      path: "/",
      hash: "#contact",
    },
  ],
  "*": [
    {
      icon: <FaHome />,
      i18n_key: "content.nav_home",
      path: "/",
    },
  ],
};

// ? Default items
export const defaultNavItems: NavItem[] = [
  {
    icon: <FaHome />,
    i18n_key: "content.nav_home",
    path: "/",
  },
];
