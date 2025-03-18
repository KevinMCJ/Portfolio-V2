import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMenu, IoClose } from "react-icons/io5";
import { navItemsByPath, defaultNavItems } from "@/config/navItems";
import ToggleLanguage from "@/components/ToggleLanguage";

const widthForItemsToFit = 1100; // ? Matches with tailwind "navbar-break"

const Navbar = () => {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(window.innerWidth > widthForItemsToFit);
  const items = navItemsByPath[pathname] || defaultNavItems;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // * UI: Open or close the burger menu dynamically verifying desktop breakpoint
  useEffect(() => {
    const desktopMediaQuery = window.matchMedia(`(min-width: ${widthForItemsToFit}px)`);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setIsMenuOpen(event.matches);
    };

    desktopMediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      desktopMediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <nav className="navbar-break:static relative z-50 flex h-fit w-full bg-secondary-300 shadow-sm shadow-primary-500 dark:bg-primary-600">
      <div className="navbar-break:flex-row navbar-break:justify-normal flex h-24 items-center justify-between gap-1 app-container">
        <h1 className="text-xl font-bold">
          <Link to={"/"}>
            Kevin <span className="text-secondary-600">Mamani</span>
          </Link>
        </h1>

        <div className="navbar-break:ml-8 navbar-break:w-fit md:w-[18ch]">
          <ToggleLanguage />
        </div>

        <button className="navbar-break:hidden" onClick={toggleMenu}>
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
            className={`navbar-break:static navbar-break:ml-auto navbar-break:mt-0 navbar-break:flex navbar-break:flex-row navbar-break:justify-center vstack absolute left-0 right-0 top-[100%] flex whitespace-nowrap text-xl backdrop-blur-2xl`}
          >
            {items.map((item, key) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: key * 0.1 }}
                className="navbar-break:w-auto w-full"
              >
                <a
                  href={item.href}
                  className="navbar-break:rounded-lg navbar-break:px-4 navbar-break:py-2 navbar-break:active:bg-inherit group relative flex items-center gap-3 p-5 font-semibold active:bg-active md:justify-center"
                  onClick={() =>
                    window.innerWidth < widthForItemsToFit &&
                    setIsMenuOpen(false)
                  }
                >
                  <i className="navbar-break:hidden text-icon transition-all group-active:rotate-[15deg] md:w-[2ch]">
                    {item.icon}
                  </i>
                  <span className="navbar-break:w-fit relative inline-block md:w-[10ch]">
                    {t(item.i18n_key)}
                    <span className="navbar-break:group-hover:w-full absolute bottom-0 left-0 h-[2px] w-0 bg-icon transition-all duration-200" />
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
