import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaHome, FaInfoCircle, FaLightbulb, FaLaptopCode, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';

// ! TODO: ADD HREF TO ITEMS
const items = [
  {
    icon: <FaHome className="text-icon" />,
    i18n_key: 'nav_home',
  },
  {
    icon: <FaInfoCircle className="text-icon" />,
    i18n_key: 'nav_about',
  },
  {
    icon: <FaLightbulb className="text-icon" />,
    i18n_key: 'nav_skills',
  },
  {
    icon: <FaLaptopCode className="text-icon" />,
    i18n_key: 'nav_projects',
  },
  {
    icon: <FaEnvelope className="text-icon" />,
    i18n_key: 'nav_contact',
  },
];

// ! TODO: ADD ANIMATIONS
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
    <nav className="w-full h-fit flex bg-secondary-300 dark:bg-primary-600 shadow-primary-500 shadow-md lg:static">
      <div
        className={`relative w-full mx-auto max-w-screen-2xl flex items-center justify-between 
        ${isMenuOpen && 'flex-col'} lg:flex-row`}
      >
        <div className="px-5 h-24 w-full flex items-center justify-between gap-4">
          <h1 className="inline-flex gap-1 text-xl font-bold">
            Kevin <span className="text-secondary-600">Mamani</span>
          </h1>
          <button className="lg:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <IoClose className="size-8" />
            ) : (
              <IoMenu className="size-8" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-[100%] bg-opacity-75 backdrop-blur-md bg-inherit w-full vstack whitespace-nowrap text-xl flex lg:static lg:mt-0 lg:flex lg:flex-row lg:justify-center lg:pr-5`}
          >
            {items.map((item, key) => (
              <motion.li
                key={key}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: key * 0.1 }}
                className="p-5 lg:py-2 lg:rounded-lg active:bg-active cursor-pointer lg:active:bg-inherit"
              >
                <div className="flex gap-3 items-center">
                  <div className="lg:hidden">{item.icon}</div>
                  <span className="font-semibold">{t(item.i18n_key)}</span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
