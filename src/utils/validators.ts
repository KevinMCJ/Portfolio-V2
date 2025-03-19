import { Experience } from "@/global/types";
import { supportedLanguages, experiencesTypes } from "@/global/constants";

// ? File used to validator functions: JSON data, forms... etc.
export const validateExperience = (item: any): item is Experience => {
  if (typeof item !== "object" || item === null) return false;

  if (typeof item.company !== "string") return false;

  if (item.role !== undefined && typeof item.role !== "string") return false;

  if (!experiencesTypes.includes(item.type)) return false;

  if (
    typeof item.unix_timestamp !== "object" ||
    typeof item.unix_timestamp.from !== "number" ||
    (item.unix_timestamp.to !== undefined &&
      typeof item.unix_timestamp.to !== "number")
  ) {
    return false;
  }

  if (
    typeof item.description !== "object" ||
    !supportedLanguages.every((lang) => typeof item.description[lang] === "string")
  ) {
    return false;
  }

  return true;
};
