import { useTranslation } from "react-i18next";
import ContactForm from "./ContactForm";
import data from "@/utils/data.json";

const ContactSection = () => {
  const { t } = useTranslation();

  const handleCopy = () => {
    navigator.clipboard.writeText(data.email);
  };

  return (
    <section id="contact" className="app-container">
      <h2 className="section-title !mb-5">{t("content.contact_title")}</h2>
      <span
        className="mx-auto block max-w-fit cursor-pointer p-2 text-xl tracking-wide underline decoration-icon underline-offset-4 sm:text-2xl"
        onClick={handleCopy}
        aria-label={`Email: ${data.email}`}
        title={t("common.copy_message")}
      >
        {data.email}
      </span>
      <p className="text-center text-sm tracking-wide text-secondary-900/80 dark:text-secondary-200/95 sm:text-base">
        {t("content.contact_message")}
      </p>
      <ContactForm />
    </section>
  );
};

export default ContactSection;
