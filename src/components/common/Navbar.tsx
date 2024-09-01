import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";
import { FaHome, FaInfoCircle, FaLightbulb, FaLaptopCode, FaEnvelope } from "react-icons/fa";

const items = [
  {
    icon: <FaHome className="text-icon" />,
    i18n_key: "nav_home",
    href: "#",
  },
  {
    icon: <FaInfoCircle className="text-icon" />,
    i18n_key: "nav_about",
    href: "#about",
  },
  {
    icon: <FaLightbulb className="text-icon" />,
    i18n_key: "nav_skills",
    href: "#skills",
  },
  {
    icon: <FaLaptopCode className="text-icon" />,
    i18n_key: "nav_projects",
    href: "#projects",
  },
  {
    icon: <FaEnvelope className="text-icon" />,
    i18n_key: "nav_contact",
    href: "#contact",
  },
];

const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > 1023);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // * UI: Open or close the menu dynamically if there is a change in the window size
  useEffect(() => {
    const desktopMediaQuery = window.matchMedia("(min-width: 1023px)");

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMenuOpen(event.matches);
    };

    desktopMediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      desktopMediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <nav className="relative flex h-fit w-full bg-secondary-300 px-5 shadow-md shadow-primary-500 dark:bg-primary-600 lg:static lg:pr-3">
      <div className="mx-auto flex w-full max-w-screen-2xl items-center justify-between gap-1 lg:flex-row">
        <div className="flex h-24 items-center justify-between gap-4">
          <h1 className="inline-flex gap-1 text-xl font-bold">
            Kevin <span className="text-secondary-600">Mamani</span>
          </h1>
        </div>

        <button className="lg:hidden" onClick={toggleMenu}>
          {isMenuOpen ? (
            <IoClose className="size-8" />
          ) : (
            <IoMenu className="size-8" />
          )}
        </button>

        {isMenuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`vstack absolute left-0 right-0 top-[100%] flex whitespace-nowrap bg-inherit bg-opacity-75 text-xl backdrop-blur-md lg:static lg:mt-0 lg:flex lg:flex-row lg:justify-center`}
          >
            {items.map((item, key) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: key * 0.1 }}
                className="w-full lg:w-auto"
              >
                <a
                  href={item.href}
                  className="group relative flex items-center gap-3 p-5 font-semibold active:bg-active lg:rounded-lg lg:px-4 lg:py-2 lg:active:bg-inherit"
                  onClick={() => window.innerWidth < 1024 && setIsMenuOpen(false)}
                >
                  <i className="transition-all group-active:rotate-[15deg] lg:hidden">
                    {item.icon}
                  </i>
                  <span className="relative inline-block">
                    {t(item.i18n_key)}
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-icon transition-all duration-200 lg:group-hover:w-full" />
                  </span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
