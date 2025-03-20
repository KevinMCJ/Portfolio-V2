// ? File used to validator functions: JSON data, forms... etc.
import { ContactData, Experience, SupportedLanguage } from "@/global/types";
import { supportedLanguages, experiencesTypes } from "@/global/constants";
import { t } from "i18next";

const emailRegex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

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

export const isValidLanguage = (languageCode: any): languageCode is SupportedLanguage => {
  return supportedLanguages.includes(languageCode);
}

export const contactValidator = (data: ContactData) => {
  let errors: Partial<ContactData> = {};
  const MAX_NAME_LENGTH = 50;
  const MAX_MESSAGE_LENGTH = 1500;

  if (!data.name.trim()) {
    errors.name = t("errors.name.required");
  } else if (data.name.trim().length > MAX_NAME_LENGTH) {
    errors.name = t("errors.common.max_length", { max: MAX_NAME_LENGTH });
  }

  if (!data.email.trim()) {
    errors.email = t("errors.email.required");
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = t("errors.email.invalid");
  }

  if (!data.message.trim()) {
    errors.message = t("errors.message.required");
  } else if (data.message.trim().length > MAX_MESSAGE_LENGTH) {
    errors.message = t("errors.common.max_length", { max: MAX_MESSAGE_LENGTH });
  }

  return errors;
};
