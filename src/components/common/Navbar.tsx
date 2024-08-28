import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoMenu, IoClose } from 'react-icons/io5';
import { FaHome, FaInfoCircle, FaLightbulb, FaLaptopCode, FaEnvelope } from 'react-icons/fa';

// ! TODO: ADD HREF TO ITEMS
const items = [
  {
    icon: <FaHome />,
    i18n_key: 'nav_home',
  },
  {
    icon: <FaInfoCircle />,
    i18n_key: 'nav_about',
  },
  {
    icon: <FaLightbulb />,
    i18n_key: 'nav_skills',
  },
  {
    icon: <FaLaptopCode />,
    i18n_key: 'nav_projects',
  },
  {
    icon: <FaEnvelope />,
    i18n_key: 'nav_contact',
  },
];

// ! TODO: ADD ANIMATIONS
const Navbar = () => {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className={`w-full h-fit flex bg-cyan-700 ${isMenuOpen && 'absolute'} lg:static dark:bg-blue-950`}>
      <div
        className={`w-full mx-auto max-w-screen-2xl flex items-center justify-between ${
          isMenuOpen && 'flex-col'
        } lg:flex-row`}
      >
        <div className="px-5 h-24 w-full flex items-center justify-between gap-4">
          <h1 className="inline-flex gap-1 text-xl font-bold">
            Kevin <span className="text-black"> Mamani</span>
          </h1>
          <button className="lg:hidden" onClick={toggleMenu}>
            {isMenuOpen ? (
              <IoClose className="size-8" />
            ) : (
              <IoMenu className="size-8" />
            )}
          </button>
        </div>
        <ul className={`-mt-5 w-full vstack whitespace-nowrap text-xl ${isMenuOpen ? 'flex' : 'hidden'} lg:mt-0 lg:flex lg:flex-row lg:justify-center lg:pr-5`}>
          {items.map((item, key) => (
            <li
              key={key}
              className="p-5 lg:py-2 lg:rounded-lg active:bg-cyan-950 cursor-pointer dark:active:bg-blue-700"
            >
              <div className="flex gap-3 items-center">
                <div className="lg:hidden">{item.icon}</div>
                <span className="font-semibold">{t(item.i18n_key)}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
