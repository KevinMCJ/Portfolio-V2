import { SupportedLanguage } from "@/global/types";
import i18next from "i18next";
import SpainFlag from "@/assets/spain.svg?react";
import UnitedKingdomFlag from "@/assets/united-kingdom.svg?react";

const ToggleLanguage = () => {
  const currentLanguage = i18next.language as SupportedLanguage;

  const toggleLanguage = (languageCode: SupportedLanguage) => {
    localStorage.setItem("lang", languageCode);
    i18next.changeLanguage(languageCode);
  };

  return (
    <label className="inline-flex cursor-pointer items-center">
      <input
        type="checkbox"
        checked={currentLanguage === "en"}
        onChange={() => toggleLanguage(currentLanguage === "es" ? "en" : "es")}
        className="sr-only"
      />
      <div
        className={`relative inline-flex h-9 w-[4.5rem] items-center overflow-hidden rounded-full p-1 shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] transition-colors duration-300 ${currentLanguage === "es" ? "bg-yellow-300" : "bg-blue-500"}`}
      >
        <span
          className={`absolute ${currentLanguage === "es" ? "right-3 text-yellow-900" : "left-3 text-blue-50"} font-semibold uppercase`}
        >
          {currentLanguage}
        </span>
        <div
          className={`flex size-5 scale-125 items-center overflow-hidden rounded-full bg-red-500 transition-all duration-300 ${currentLanguage === "es" ? "translate-x-1" : "translate-x-10"}`}
        >
          {currentLanguage === "es" ? (
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
