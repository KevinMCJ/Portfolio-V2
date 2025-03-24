import { Trans, useTranslation } from "react-i18next";

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="app-container mt-12">
      <h2 className="section-title">{t("content.about_title")}</h2>
      <div className="mx-auto grid items-center justify-center gap-6 lg:w-[90%] lg:grid-cols-[1fr_2fr] lg:flex-row lg:gap-24">
        <div className="photo_container mx-auto lg:min-w-[320px]">
          <img
            className="w-full max-w-[400px]"
            src="/src/assets/me.png"
            alt="Kevin Mamani photo"
          />
        </div>
        <p className="max-h-[400px] overflow-y-auto text-lg xl:text-xl">
          <Trans
            i18nKey="content.about_description"
            components={{
              u: <u className="underline-offset-4" />,
              strong: (
                <span className="text-secondary-700 dark:text-primary-400 font-semibold" />
              ),
            }}
          />
        </p>
      </div>
    </section>
  );
};

export default AboutSection;
