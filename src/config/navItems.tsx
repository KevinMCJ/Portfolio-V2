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
  href: string;
};

export const navItemsByPath: Record<string, NavItem[]> = {
  "/": [
    {
      icon: <FaLightbulb />,
      i18n_key: "content.nav_skills",
      href: "#skills",
    },
    {
      icon: <FaLaptopCode />,
      i18n_key: "content.nav_projects",
      href: "#projects",
    },
    {
      icon: <FaBriefcase />,
      i18n_key: "content.nav_experience",
      href: "#experience",
    },
    {
      icon: <FaUser />,
      i18n_key: "content.nav_about",
      href: "#about",
    },
    {
      icon: <FaEnvelope />,
      i18n_key: "content.nav_contact",
      href: "#contact",
    },
  ],
  "*": [
    {
      icon: <FaHome />,
      i18n_key: "content.nav_home",
      href: "/",
    },
  ],
};

// ? Default items
export const defaultNavItems: NavItem[] = [
  {
    icon: <FaHome />,
    i18n_key: "content.nav_home",
    href: "/",
  },
];
