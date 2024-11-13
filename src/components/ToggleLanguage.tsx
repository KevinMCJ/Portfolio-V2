import i18next from "i18next";
import SpainFlag from "@assets/spain.svg?react";
import UnitedKingdomFlag from "@assets/united-kingdom.svg?react";

const ToggleLanguage = () => {
  const toggleLanguage = () => {
    i18next.changeLanguage(i18next.language === "en" ? "es" : "en");
  };

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={i18next.language === "en"}
        onChange={toggleLanguage}
        className="sr-only"
      />
      <div
        className={`relative inline-flex h-9 w-[4.5rem] items-center overflow-hidden rounded-full p-1 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] transition-colors duration-300 ${i18next.language === "es" ? "bg-yellow-300" : "bg-blue-500"}`}
      >
        <span
          className={`absolute ${i18next.language === "es" ? "right-3 text-yellow-900" : "left-3 text-blue-50"} font-semibold uppercase`}
        >
          {i18next.language}
        </span>
        <div
          className={`flex size-5 scale-125 items-center overflow-hidden rounded-full bg-red-500 transition-all duration-300 ${i18next.language === "es" ? "translate-x-1" : "translate-x-10"}`}
        >
          {i18next.language === "es" ? (
            <SpainFlag className="scale-150" />
          ) : (
            <UnitedKingdomFlag className="scale-150" />
          )}
        </div>
      </div>
    </label>
  );
};

export default ToggleLanguage;
